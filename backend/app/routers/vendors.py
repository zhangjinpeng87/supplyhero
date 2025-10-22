from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, VendorProfile
from app.routers.auth import get_current_user
from app.schemas import VendorProfileCreate, VendorProfileResponse

router = APIRouter()

@router.get("/profile", response_model=VendorProfileResponse)
async def get_vendor_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "vendor":
        raise HTTPException(status_code=403, detail="Access denied")
    
    vendor_profile = db.query(VendorProfile).filter(VendorProfile.user_id == current_user.id).first()
    if not vendor_profile:
        raise HTTPException(status_code=404, detail="Vendor profile not found")
    
    return vendor_profile

@router.post("/profile", response_model=VendorProfileResponse)
async def create_vendor_profile(
    profile: VendorProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "vendor":
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Check if profile already exists
    existing_profile = db.query(VendorProfile).filter(VendorProfile.user_id == current_user.id).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Vendor profile already exists")
    
    vendor_profile = VendorProfile(
        user_id=current_user.id,
        **profile.dict()
    )
    db.add(vendor_profile)
    db.commit()
    db.refresh(vendor_profile)
    
    return vendor_profile
