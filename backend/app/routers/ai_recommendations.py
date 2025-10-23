from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, VendorProfile, BuyerProfile, Order
from app.routers.auth import get_current_user
from app.ai_models.supply_chain_ai import ai_service

router = APIRouter()

@router.get("/recommendations")
async def get_supplier_recommendations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get AI-powered supplier recommendations for the current user
    """
    if current_user.role != "buyer":
        raise HTTPException(status_code=403, detail="Access denied. Buyers only.")
    
    # Get buyer profile
    buyer_profile = db.query(BuyerProfile).filter(BuyerProfile.user_id == current_user.id).first()
    if not buyer_profile:
        raise HTTPException(status_code=404, detail="Buyer profile not found")
    
    # Get all vendors for recommendations
    vendors = db.query(VendorProfile).all()
    
    # Convert to format expected by AI service
    suppliers_data = []
    for vendor in vendors:
        suppliers_data.append({
            'company_name': vendor.company_name,
            'business_type': vendor.business_type,
            'description': vendor.description,
            'category': vendor.business_type,
            'rating': vendor.rating
        })
    
    # Train the AI model if not already trained
    if not ai_service.is_trained:
        ai_service.train_supplier_matching(suppliers_data)
    
    # Get recommendations
    buyer_data = {
        'company_name': buyer_profile.company_name,
        'business_type': buyer_profile.business_type,
        'description': buyer_profile.description
    }
    
    recommendations = ai_service.get_supplier_recommendations(buyer_data, top_n=5)
    
    # Format response with vendor details
    result = []
    for rec in recommendations:
        vendor = vendors[rec['supplier_id']]
        result.append({
            'vendor_id': vendor.id,
            'company_name': vendor.company_name,
            'business_type': vendor.business_type,
            'rating': vendor.rating,
            'similarity_score': rec['similarity_score'],
            'recommendation_reason': rec['recommendation_reason']
        })
    
    return {"recommendations": result}

@router.get("/forecast")
async def get_demand_forecast(
    product_category: str = "general",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get AI-powered demand forecast for a product category
    """
    # Mock historical data for demonstration
    historical_data = [
        {'product_category': 1, 'season': 1, 'month': 1, 'previous_demand': 100, 'demand': 120},
        {'product_category': 1, 'season': 2, 'month': 4, 'previous_demand': 120, 'demand': 110},
        {'product_category': 1, 'season': 3, 'month': 7, 'previous_demand': 110, 'demand': 130},
        {'product_category': 1, 'season': 4, 'month': 10, 'previous_demand': 130, 'demand': 125},
    ]
    
    # Train the model
    ai_service.train_demand_forecasting(historical_data)
    
    # Get forecast
    product_info = {
        'category': 1,
        'season': 1,
        'month': 1,
        'previous_demand': 125
    }
    
    forecast = ai_service.forecast_demand(product_info)
    
    return {
        "product_category": product_category,
        "forecast": forecast,
        "confidence_level": "high" if forecast['confidence'] > 0.8 else "medium" if forecast['confidence'] > 0.6 else "low"
    }

@router.get("/scoring")
async def get_supplier_scoring(
    vendor_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get AI-powered supplier scoring
    """
    # Get vendor
    vendor = db.query(VendorProfile).filter(VendorProfile.id == vendor_id).first()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    # Get order history for this vendor
    orders = db.query(Order).filter(Order.vendor_id == vendor_id).all()
    
    # Convert orders to format expected by AI service
    order_history = []
    for order in orders:
        order_history.append({
            'status': order.status.value,
            'created_at': order.created_at.isoformat()
        })
    
    # Calculate supplier score
    supplier_data = {
        'rating': vendor.rating,
        'avg_response_time': 12,  # Mock data
        'quality_score': 0.9      # Mock data
    }
    
    score = ai_service.calculate_supplier_score(supplier_data, order_history)
    
    return {
        "vendor_id": vendor_id,
        "company_name": vendor.company_name,
        "ai_score": round(score, 2),
        "score_breakdown": {
            "rating_factor": round(vendor.rating * 0.4, 2),
            "completion_rate": round(0.8 * 0.3, 2),  # Mock data
            "response_time": round(0.9 * 0.2, 2),    # Mock data
            "quality": round(0.9 * 0.1, 2)           # Mock data
        },
        "recommendation": "Highly recommended" if score > 0.8 else "Recommended" if score > 0.6 else "Consider alternatives"
    }
