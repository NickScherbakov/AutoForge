from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import User, Transaction
from app.schemas.schemas import UserResponse, TransactionResponse, DepositRequest
from app.api.dependencies import get_current_user
from app.core.config import settings
import stripe

router = APIRouter(prefix="/users", tags=["users"])

# Configure Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY


@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user


@router.get("/me/transactions", response_model=List[TransactionResponse])
def get_user_transactions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 50
):
    """Get user transaction history"""
    transactions = db.query(Transaction).filter(
        Transaction.user_id == current_user.id
    ).order_by(Transaction.created_at.desc()).limit(limit).all()
    
    return transactions


@router.post("/me/deposit", response_model=TransactionResponse)
def deposit_funds(
    deposit_data: DepositRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Deposit funds to user account via Stripe"""
    try:
        # Create Stripe payment intent
        payment_intent = stripe.PaymentIntent.create(
            amount=int(deposit_data.amount * 100),  # Convert to cents
            currency="usd",
            payment_method=deposit_data.payment_method_id,
            confirm=True,
            automatic_payment_methods={
                "enabled": True,
                "allow_redirects": "never"
            }
        )
        
        if payment_intent.status == "succeeded":
            # Add funds to user balance
            current_user.balance += deposit_data.amount
            
            # Create transaction record
            transaction = Transaction(
                user_id=current_user.id,
                amount=deposit_data.amount,
                description=f"Deposit via Stripe",
                stripe_payment_intent_id=payment_intent.id
            )
            
            db.add(transaction)
            db.commit()
            db.refresh(transaction)
            
            return transaction
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Payment failed: {payment_intent.status}"
            )
            
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Stripe error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Deposit failed: {str(e)}"
        )
