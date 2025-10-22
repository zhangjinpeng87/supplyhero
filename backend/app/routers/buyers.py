from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, BuyerProfile
from app.routers.auth import get_current_user
from app.schemas import BuyerProfileCreate, BuyerProfileResponse

router = APIRouter()

@router.get("/profile", response_model=BuyerProfileResponse)
async def get_buyer_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "buyer":
        raise HTTPException(status_code=403, detail="Access denied")
    
    buyer_profile = db.query(BuyerProfile).filter(BuyerProfile.user_id == current_user.id).first()
    if not buyer_profile:
        raise HTTPException(status_code=404, detail="Buyer profile not found")
    
    return buyer_profile

@router.post("/profile", response_model=BuyerProfileResponse)
async def create_buyer_profile(
    profile: BuyerProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "buyer":
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Check if profile already exists
    existing_profile = db.query(BuyerProfile).filter(BuyerProfile.user_id == current_user.id).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Buyer profile already exists")
    
    buyer_profile = BuyerProfile(
        user_id=current_user.id,
        **profile.dict()
    )
    db.add(buyer_profile)
    db.commit()
    db.refresh(buyer_profile)
    
    return buyer_profile
