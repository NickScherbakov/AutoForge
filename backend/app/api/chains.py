from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Chain, ExecutionLog, ExecutionStatus, User
from app.schemas.schemas import ChainCreate, ChainUpdate, ChainResponse, ExecutionTrigger, ExecutionLogResponse
from app.api.dependencies import get_current_user
from app.workers.tasks import execute_chain
from datetime import datetime

router = APIRouter(prefix="/chains", tags=["chains"])


@router.post("/", response_model=ChainResponse)
def create_chain(
    chain_data: ChainCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new automation chain"""
    new_chain = Chain(
        name=chain_data.name,
        description=chain_data.description,
        user_id=current_user.id,
        trigger_type=chain_data.trigger_type,
        trigger_config=chain_data.trigger_config,
        actions=chain_data.actions,
        execution_cost=chain_data.execution_cost
    )
    
    db.add(new_chain)
    db.commit()
    db.refresh(new_chain)
    
    return new_chain


@router.get("/", response_model=List[ChainResponse])
def list_chains(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List all chains for current user"""
    chains = db.query(Chain).filter(Chain.user_id == current_user.id).all()
    return chains


@router.get("/{chain_id}", response_model=ChainResponse)
def get_chain(
    chain_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific chain"""
    chain = db.query(Chain).filter(
        Chain.id == chain_id,
        Chain.user_id == current_user.id
    ).first()
    
    if not chain:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chain not found"
        )
    
    return chain


@router.put("/{chain_id}", response_model=ChainResponse)
def update_chain(
    chain_id: int,
    chain_data: ChainUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a chain"""
    chain = db.query(Chain).filter(
        Chain.id == chain_id,
        Chain.user_id == current_user.id
    ).first()
    
    if not chain:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chain not found"
        )
    
    # Update fields
    if chain_data.name is not None:
        chain.name = chain_data.name
    if chain_data.description is not None:
        chain.description = chain_data.description
    if chain_data.trigger_config is not None:
        chain.trigger_config = chain_data.trigger_config
    if chain_data.actions is not None:
        chain.actions = chain_data.actions
    if chain_data.is_active is not None:
        chain.is_active = chain_data.is_active
    if chain_data.execution_cost is not None:
        chain.execution_cost = chain_data.execution_cost
    
    chain.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(chain)
    
    return chain


@router.delete("/{chain_id}")
def delete_chain(
    chain_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a chain"""
    chain = db.query(Chain).filter(
        Chain.id == chain_id,
        Chain.user_id == current_user.id
    ).first()
    
    if not chain:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chain not found"
        )
    
    db.delete(chain)
    db.commit()
    
    return {"message": "Chain deleted successfully"}


@router.post("/{chain_id}/execute", response_model=ExecutionLogResponse)
def trigger_chain_execution(
    chain_id: int,
    trigger_data: ExecutionTrigger,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Manually trigger chain execution"""
    chain = db.query(Chain).filter(
        Chain.id == chain_id,
        Chain.user_id == current_user.id
    ).first()
    
    if not chain:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chain not found"
        )
    
    if not chain.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Chain is not active"
        )
    
    # Create execution log
    execution_log = ExecutionLog(
        chain_id=chain_id,
        trigger_data=trigger_data.trigger_data,
        status=ExecutionStatus.PENDING
    )
    
    db.add(execution_log)
    db.commit()
    db.refresh(execution_log)
    
    # Trigger async execution
    execute_chain.delay(execution_log.id)
    
    return execution_log


@router.get("/{chain_id}/executions", response_model=List[ExecutionLogResponse])
def list_chain_executions(
    chain_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 50
):
    """List execution logs for a chain"""
    chain = db.query(Chain).filter(
        Chain.id == chain_id,
        Chain.user_id == current_user.id
    ).first()
    
    if not chain:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chain not found"
        )
    
    executions = db.query(ExecutionLog).filter(
        ExecutionLog.chain_id == chain_id
    ).order_by(ExecutionLog.created_at.desc()).limit(limit).all()
    
    return executions
