from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.models import TriggerType, ActionType, ExecutionStatus


# User schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    balance: float
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


# Chain schemas
class ChainCreate(BaseModel):
    name: str
    description: Optional[str] = None
    trigger_type: TriggerType
    trigger_config: Dict[str, Any]
    actions: List[Dict[str, Any]]
    execution_cost: float = 0.10


class ChainUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    trigger_config: Optional[Dict[str, Any]] = None
    actions: Optional[List[Dict[str, Any]]] = None
    is_active: Optional[bool] = None
    execution_cost: Optional[float] = None


class ChainResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    user_id: int
    trigger_type: TriggerType
    trigger_config: Dict[str, Any]
    actions: List[Dict[str, Any]]
    is_active: bool
    execution_cost: float
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Execution schemas
class ExecutionTrigger(BaseModel):
    chain_id: int
    trigger_data: Optional[Dict[str, Any]] = None


class ExecutionLogResponse(BaseModel):
    id: int
    chain_id: int
    status: ExecutionStatus
    trigger_data: Optional[Dict[str, Any]]
    execution_result: Optional[Dict[str, Any]]
    error_message: Optional[str]
    cost: float
    charged: bool
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    created_at: datetime
    
    class Config:
        from_attributes = True


# Transaction schemas
class TransactionResponse(BaseModel):
    id: int
    user_id: int
    amount: float
    description: str
    stripe_payment_intent_id: Optional[str]
    execution_log_id: Optional[int]
    created_at: datetime
    
    class Config:
        from_attributes = True


class DepositRequest(BaseModel):
    amount: float = Field(..., gt=0, description="Amount to deposit in USD")
    payment_method_id: str = Field(..., description="Stripe payment method ID")
