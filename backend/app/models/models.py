from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base


class TriggerType(str, enum.Enum):
    WEBHOOK = "webhook"
    SCHEDULE = "schedule"
    MANUAL = "manual"


class ActionType(str, enum.Enum):
    HTTP_REQUEST = "http_request"
    SEND_EMAIL = "send_email"
    TELEGRAM_MESSAGE = "telegram_message"


class ExecutionStatus(str, enum.Enum):
    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    balance = Column(Float, default=0.0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    chains = relationship("Chain", back_populates="owner")
    transactions = relationship("Transaction", back_populates="user")


class Chain(Base):
    __tablename__ = "chains"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Trigger configuration
    trigger_type = Column(Enum(TriggerType), nullable=False)
    trigger_config = Column(JSON, nullable=False)  # Store trigger-specific config
    
    # Actions configuration
    actions = Column(JSON, nullable=False)  # List of actions with configs
    
    is_active = Column(Boolean, default=True)
    execution_cost = Column(Float, default=0.10)  # Cost per execution
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    owner = relationship("User", back_populates="chains")
    executions = relationship("ExecutionLog", back_populates="chain")


class ExecutionLog(Base):
    __tablename__ = "execution_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    chain_id = Column(Integer, ForeignKey("chains.id"), nullable=False)
    status = Column(Enum(ExecutionStatus), default=ExecutionStatus.PENDING)
    
    trigger_data = Column(JSON, nullable=True)  # Data that triggered the execution
    execution_result = Column(JSON, nullable=True)  # Result of each action
    error_message = Column(Text, nullable=True)
    
    cost = Column(Float, default=0.0)  # Actual cost charged
    charged = Column(Boolean, default=False)  # Whether user was charged
    
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    chain = relationship("Chain", back_populates="executions")


class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)  # Positive for deposits, negative for charges
    description = Column(String, nullable=False)
    
    # Stripe info
    stripe_payment_intent_id = Column(String, nullable=True)
    execution_log_id = Column(Integer, ForeignKey("execution_logs.id"), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="transactions")
