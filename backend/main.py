from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
import os
import time
from dotenv import load_dotenv

from app.database import get_db, engine
from app.routers import auth, vendors, buyers, orders, inventory, logistics, payments, ai_recommendations
from app.models import Base

load_dotenv()

app = FastAPI(
    title="Supply Hero API",
    description="AI-Powered Supply Chain Platform for SMBs",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(vendors.router, prefix="/api/vendors", tags=["Vendors"])
app.include_router(buyers.router, prefix="/api/buyers", tags=["Buyers"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(logistics.router, prefix="/api/logistics", tags=["Logistics"])
app.include_router(payments.router, prefix="/api/payments", tags=["Payments"])
app.include_router(ai_recommendations.router, prefix="/api/ai", tags=["AI Recommendations"])

@app.on_event("startup")
async def startup_event():
    """Wait for database to be ready and create tables"""
    max_retries = 30
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            # Test database connection
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            
            # Create tables
            Base.metadata.create_all(bind=engine)
            print("✅ Database connection successful and tables created")
            break
            
        except Exception as e:
            retry_count += 1
            print(f"⏳ Waiting for database... (attempt {retry_count}/{max_retries})")
            if retry_count >= max_retries:
                print(f"❌ Could not connect to database after {max_retries} attempts")
                print(f"   Error: {e}")
            else:
                time.sleep(2)

@app.get("/")
async def root():
    return {"message": "Supply Hero API - AI-Powered Supply Chain Platform"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "supply-hero-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
