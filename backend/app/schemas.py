from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime
from app.models import UserRole, OrderStatus, PaymentStatus

# User schemas
class UserBase(BaseModel):
    model_config = ConfigDict(use_enum_values=True)
    
    email: EmailStr
    username: str
    full_name: str
    role: UserRole

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
        use_enum_values = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Vendor schemas
class VendorProfileBase(BaseModel):
    company_name: str
    business_type: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None

class VendorProfileCreate(VendorProfileBase):
    pass

class VendorProfileResponse(VendorProfileBase):
    id: int
    user_id: int
    rating: float
    total_orders: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Buyer schemas
class BuyerProfileBase(BaseModel):
    company_name: str
    business_type: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None

class BuyerProfileCreate(BuyerProfileBase):
    pass

class BuyerProfileResponse(BuyerProfileBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Product schemas
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    sku: str
    price: float
    quantity_available: int = 0
    minimum_order_quantity: int = 1
    unit: str = "piece"

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    vendor_id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Order schemas
class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    unit_price: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase):
    id: int
    order_id: int
    total_price: float
    
    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    shipping_address: str
    notes: Optional[str] = None
    order_items: list[OrderItemCreate]

class OrderCreate(OrderBase):
    vendor_id: int

class OrderResponse(OrderBase):
    id: int
    order_number: str
    buyer_id: int
    vendor_id: int
    status: OrderStatus
    total_amount: float
    payment_status: PaymentStatus
    created_at: datetime
    order_items: list[OrderItemResponse]
    
    class Config:
        from_attributes = True

# Shipment schemas
class ShipmentBase(BaseModel):
    tracking_number: Optional[str] = None
    carrier: Optional[str] = None
    status: Optional[str] = None
    estimated_delivery: Optional[datetime] = None

class ShipmentCreate(ShipmentBase):
    order_id: int

class ShipmentResponse(ShipmentBase):
    id: int
    order_id: int
    actual_delivery: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
