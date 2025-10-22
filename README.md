# Supply Hero - AI-Powered Supply Chain Platform for SMBs

A comprehensive supply chain management platform designed for small and medium businesses, connecting vendors and buyers through intelligent matching and streamlined operations.

## Architecture Overview

The platform consists of three main layers:

### 1. User Interface Layer (Frontend)
- **Technology**: Next.js + TypeScript + Tailwind CSS
- **Users**: Vendors, Buyers, Admin
- **Features**:
  - Authentication (login/register)
  - Vendor dashboard (inventory status, order tracking)
  - Buyer interface (order management, supplier evaluation)
  - Admin panel

### 2. Application Services Layer (Backend)
- **Technology**: Python/FastAPI
- **Modules**:
  - Order & Inventory Management
  - Logistics & Shipment Tracking
  - Invoice & Payment Processing
  - AI Recommendation Engine
  - Supplier Evaluation & Matching
  - Integration Hub (ERP, Shopify, etc.)

### 3. Data & Intelligence Layer
- **Database**: PostgreSQL
- **AI/ML**: Recommendation systems, forecasting, scoring algorithms
- **Data**: Orders, inventory status, user profiles, transaction history

## Project Structure

```
supply-hero/
├── frontend/          # Next.js application
├── backend/           # FastAPI application
├── database/          # Database schemas and migrations
├── ai-models/         # ML models and recommendation engine
├── integrations/      # Third-party integrations
├── docs/             # Documentation
└── docker/           # Docker configurations
```

## Getting Started

### Prerequisites
- Docker and Docker Compose (recommended for quick start)
- Node.js 18+ (for local development)
- Python 3.9+ (for local development)
- PostgreSQL 14+ (for local development)

## 🚀 Quick Start with Docker (Recommended)

The fastest way to get Supply Hero running is with Docker. This will set up all services automatically.

### 1. Clone and Setup
```bash
git clone <repository-url>
cd supply-hero
```

### 2. Run the Setup Script
```bash
cd docker
./setup.sh
```

### 3. Access the Application
Once the setup is complete, you can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: localhost:5432 (postgres/postgres)
- **Redis**: localhost:6379

### 4. Test the Platform
1. Open http://localhost:3000 in your browser
2. Click "Get Started" to register
3. Choose your role (Vendor or Buyer)
4. Complete the registration form
5. Explore your dashboard!

### Docker Commands
The setup script automatically detects your Docker Compose version and uses the appropriate command.

**For Docker Compose v1:**
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# View service status
docker-compose ps
```

**For Docker Compose v2:**
```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f

# Restart services
docker compose restart

# View service status
docker compose ps
```

### Troubleshooting Docker Setup
If you encounter issues:

1. **Port conflicts**: Make sure ports 3000, 8000, 5432, and 6379 are available
2. **Permission issues**: Run `chmod +x docker/setup.sh` to make the script executable
3. **Docker not running**: Ensure Docker Desktop is running
4. **View logs**: Use `docker-compose logs -f` to see detailed error messages

## Development Setup (Manual)

1. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Database Setup**
   ```bash
   cd database
   # Run migration scripts
   ```

## Features

### For Vendors
- Inventory management and status tracking
- Order processing and fulfillment
- Shipment tracking
- Performance analytics
- Integration with existing systems

### For Buyers
- Supplier discovery and evaluation
- Order placement and management
- Real-time tracking
- Invoice and payment processing
- AI-powered recommendations

### For Admins
- Platform oversight and management
- User management
- Analytics and reporting
- System configuration

## Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, React Query
- **Backend**: FastAPI, Python, SQLAlchemy, Celery
- **Database**: PostgreSQL, Redis
- **AI/ML**: scikit-learn, pandas, numpy
- **Integrations**: REST APIs, webhooks
- **Deployment**: Docker, Kubernetes (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
