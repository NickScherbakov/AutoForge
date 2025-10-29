from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Chain, ExecutionLog, ExecutionStatus, TriggerType
from app.workers.tasks import execute_chain
import hashlib
import hmac

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/{chain_id}")
async def webhook_trigger(
    chain_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    """Webhook endpoint to trigger chain execution"""
    # Get chain
    chain = db.query(Chain).filter(Chain.id == chain_id).first()
    
    if not chain:
        return {"error": "Chain not found"}, 404
    
    if not chain.is_active:
        return {"error": "Chain is not active"}, 400
    
    if chain.trigger_type != TriggerType.WEBHOOK:
        return {"error": "Chain is not configured for webhook trigger"}, 400
    
    # Get webhook data
    try:
        body = await request.json()
    except:
        body = {}
    
    # Optionally verify webhook secret
    webhook_secret = chain.trigger_config.get("secret")
    if webhook_secret:
        signature = request.headers.get("X-Webhook-Signature")
        if not signature:
            return {"error": "Missing webhook signature"}, 401
        
        # Verify signature (simple HMAC verification)
        body_bytes = await request.body()
        expected_signature = hmac.new(
            webhook_secret.encode(),
            body_bytes,
            hashlib.sha256
        ).hexdigest()
        
        if not hmac.compare_digest(signature, expected_signature):
            return {"error": "Invalid webhook signature"}, 401
    
    # Create execution log
    execution_log = ExecutionLog(
        chain_id=chain_id,
        trigger_data={"webhook_data": body, "headers": dict(request.headers)},
        status=ExecutionStatus.PENDING
    )
    
    db.add(execution_log)
    db.commit()
    db.refresh(execution_log)
    
    # Trigger async execution
    execute_chain.delay(execution_log.id)
    
    return {
        "message": "Webhook received and chain execution triggered",
        "execution_log_id": execution_log.id
    }
