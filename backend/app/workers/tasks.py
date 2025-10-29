from app.workers.celery_app import celery_app
from app.core.database import SessionLocal
from app.models.models import Chain, ExecutionLog, ExecutionStatus, User, Transaction, TriggerType
from datetime import datetime
import requests
import json
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings
import asyncio


@celery_app.task(bind=True)
def execute_chain(self, execution_log_id: int):
    """Execute a chain workflow"""
    db = SessionLocal()
    
    try:
        # Get execution log and chain
        execution_log = db.query(ExecutionLog).filter(ExecutionLog.id == execution_log_id).first()
        if not execution_log:
            return {"error": "Execution log not found"}
        
        chain = db.query(Chain).filter(Chain.id == execution_log.chain_id).first()
        if not chain:
            execution_log.status = ExecutionStatus.FAILED
            execution_log.error_message = "Chain not found"
            db.commit()
            return {"error": "Chain not found"}
        
        # Check if chain is active
        if not chain.is_active:
            execution_log.status = ExecutionStatus.FAILED
            execution_log.error_message = "Chain is not active"
            db.commit()
            return {"error": "Chain is not active"}
        
        # Update status to running
        execution_log.status = ExecutionStatus.RUNNING
        execution_log.started_at = datetime.utcnow()
        db.commit()
        
        # Execute each action in the chain
        results = []
        all_success = True
        
        for action in chain.actions:
            action_type = action.get("type")
            action_config = action.get("config", {})
            
            try:
                if action_type == "http_request":
                    result = execute_http_request(action_config)
                elif action_type == "send_email":
                    result = execute_send_email(action_config)
                elif action_type == "telegram_message":
                    result = execute_telegram_message(action_config)
                else:
                    result = {"error": f"Unknown action type: {action_type}"}
                    all_success = False
                
                results.append({
                    "action_type": action_type,
                    "result": result,
                    "success": "error" not in result
                })
                
                if "error" in result:
                    all_success = False
                    
            except Exception as e:
                results.append({
                    "action_type": action_type,
                    "result": {"error": str(e)},
                    "success": False
                })
                all_success = False
        
        # Update execution log
        execution_log.execution_result = {"actions": results}
        execution_log.completed_at = datetime.utcnow()
        
        if all_success:
            execution_log.status = ExecutionStatus.SUCCESS
            
            # Charge user for successful execution
            user = db.query(User).filter(User.id == chain.user_id).first()
            if user and user.balance >= chain.execution_cost:
                user.balance -= chain.execution_cost
                execution_log.cost = chain.execution_cost
                execution_log.charged = True
                
                # Create transaction record
                transaction = Transaction(
                    user_id=user.id,
                    amount=-chain.execution_cost,
                    description=f"Execution of chain: {chain.name}",
                    execution_log_id=execution_log.id
                )
                db.add(transaction)
            else:
                execution_log.error_message = "Insufficient balance to charge for execution"
        else:
            execution_log.status = ExecutionStatus.FAILED
            execution_log.error_message = "One or more actions failed"
        
        db.commit()
        
        return {
            "execution_log_id": execution_log_id,
            "status": execution_log.status.value,
            "results": results
        }
        
    except Exception as e:
        execution_log.status = ExecutionStatus.FAILED
        execution_log.error_message = str(e)
        execution_log.completed_at = datetime.utcnow()
        db.commit()
        return {"error": str(e)}
    
    finally:
        db.close()


def execute_http_request(config: dict):
    """Execute HTTP request action"""
    try:
        method = config.get("method", "GET").upper()
        url = config.get("url")
        headers = config.get("headers", {})
        body = config.get("body", {})
        
        if not url:
            return {"error": "URL is required for HTTP request"}
        
        if method == "GET":
            response = requests.get(url, headers=headers, timeout=30)
        elif method == "POST":
            response = requests.post(url, headers=headers, json=body, timeout=30)
        elif method == "PUT":
            response = requests.put(url, headers=headers, json=body, timeout=30)
        elif method == "DELETE":
            response = requests.delete(url, headers=headers, timeout=30)
        else:
            return {"error": f"Unsupported HTTP method: {method}"}
        
        return {
            "status_code": response.status_code,
            "response": response.text[:1000],  # Limit response size
            "success": response.status_code < 400
        }
        
    except Exception as e:
        return {"error": str(e)}


def execute_send_email(config: dict):
    """Execute send email action"""
    try:
        to_email = config.get("to")
        subject = config.get("subject")
        body = config.get("body")
        
        if not to_email or not subject or not body:
            return {"error": "to, subject, and body are required for email"}
        
        # Create message
        message = MIMEMultipart()
        message["From"] = settings.SMTP_FROM
        message["To"] = to_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))
        
        # Send email (synchronous version for Celery)
        import smtplib
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            if settings.SMTP_USER and settings.SMTP_PASSWORD:
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(message)
        
        return {"success": True, "to": to_email}
        
    except Exception as e:
        return {"error": str(e)}


def execute_telegram_message(config: dict):
    """Execute Telegram message action"""
    try:
        chat_id = config.get("chat_id")
        message = config.get("message")
        
        if not chat_id or not message:
            return {"error": "chat_id and message are required for Telegram"}
        
        if not settings.TELEGRAM_BOT_TOKEN:
            return {"error": "Telegram bot token not configured"}
        
        url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
        response = requests.post(url, json={
            "chat_id": chat_id,
            "text": message
        }, timeout=30)
        
        if response.status_code == 200:
            return {"success": True, "message_id": response.json().get("result", {}).get("message_id")}
        else:
            return {"error": f"Telegram API error: {response.text}"}
        
    except Exception as e:
        return {"error": str(e)}


@celery_app.task
def check_scheduled_chains():
    """Check for scheduled chains that need to be executed"""
    db = SessionLocal()
    
    try:
        # Find all active chains with schedule trigger
        scheduled_chains = db.query(Chain).filter(
            Chain.is_active == True,
            Chain.trigger_type == TriggerType.SCHEDULE
        ).all()
        
        for chain in scheduled_chains:
            # Check if it's time to execute based on schedule config
            schedule_config = chain.trigger_config
            # For MVP, we'll execute all scheduled chains that haven't been executed in the last hour
            # In production, implement proper schedule parsing (cron, interval, etc.)
            
            # Get last execution
            last_execution = db.query(ExecutionLog).filter(
                ExecutionLog.chain_id == chain.id
            ).order_by(ExecutionLog.created_at.desc()).first()
            
            # Simple logic: execute if no execution in last hour
            should_execute = False
            if not last_execution:
                should_execute = True
            else:
                from datetime import timedelta
                time_since_last = datetime.utcnow() - last_execution.created_at
                interval = schedule_config.get("interval_minutes", 60)
                if time_since_last.total_seconds() >= interval * 60:
                    should_execute = True
            
            if should_execute:
                # Create execution log
                execution_log = ExecutionLog(
                    chain_id=chain.id,
                    trigger_data={"scheduled": True, "timestamp": datetime.utcnow().isoformat()},
                    status=ExecutionStatus.PENDING
                )
                db.add(execution_log)
                db.commit()
                db.refresh(execution_log)
                
                # Trigger execution
                execute_chain.delay(execution_log.id)
        
        return {"checked_chains": len(scheduled_chains)}
        
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()
