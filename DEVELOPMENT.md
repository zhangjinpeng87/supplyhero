# Supply Hero - Development Guide

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.9+ (for local development)
- PostgreSQL 14+ (for local development)

### Using Docker (Recommended)

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd supply-hero
   ```

2. **Run the setup script:**
   ```bash
   cd docker
   ./setup.sh
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Manual Setup

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp env.example .env
# Edit .env with your database settings
uvicorn main:app --reload
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

#### Database Setup
```bash
# Create database
createdb supply_hero

# Run schema
psql supply_hero < database/schema.sql
```

## Project Structure

```
supply-hero/
├── frontend/          # Next.js React application
│   ├── src/
│   │   ├── app/      # Next.js app router pages
│   │   ├── components/ # React components
│   │   ├── lib/      # Utilities and API client
│   │   └── types/    # TypeScript type definitions
├── backend/          # FastAPI Python application
│   ├── app/
│   │   ├── routers/  # API route handlers
│   │   ├── models/   # SQLAlchemy models
│   │   ├── schemas/  # Pydantic schemas
│   │   └── services/ # Business logic
├── database/         # Database schemas and migrations
├── ai-models/        # ML models and recommendation engine
├── integrations/     # Third-party integrations
└── docker/          # Docker configurations
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Vendors
- `GET /api/vendors/profile` - Get vendor profile
- `POST /api/vendors/profile` - Create vendor profile

### Buyers
- `GET /api/buyers/profile` - Get buyer profile
- `POST /api/buyers/profile` - Create buyer profile

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/{id}` - Get order details

### Inventory
- `GET /api/inventory` - List products
- `POST /api/inventory` - Create product
- `GET /api/inventory/status` - Get inventory status

### Logistics
- `POST /api/logistics` - Create shipment
- `GET /api/logistics/track/{tracking_number}` - Track shipment

### AI Recommendations
- `GET /api/ai/recommendations` - Get supplier recommendations
- `GET /api/ai/forecast` - Get demand forecast
- `GET /api/ai/scoring` - Get supplier scoring

## Development Workflow

### Adding New Features

1. **Backend Changes:**
   - Add models in `app/models.py`
   - Create schemas in `app/schemas.py`
   - Implement routes in `app/routers/`
   - Add business logic in `app/services/`

2. **Frontend Changes:**
   - Create components in `src/components/`
   - Add pages in `src/app/`
   - Update API client in `src/lib/api.ts`
   - Add types in `src/types/`

3. **Database Changes:**
   - Update schema in `database/schema.sql`
   - Create migration scripts
   - Update Docker setup if needed

### Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### Code Quality

```bash
# Backend linting
cd backend
black .
flake8 .

# Frontend linting
cd frontend
npm run lint
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost/supply_hero
SECRET_KEY=your-super-secret-jwt-key
REDIS_URL=redis://localhost:6379
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Production Docker Setup
```bash
cd docker
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment
1. Set up production database
2. Configure environment variables
3. Build and deploy frontend
4. Deploy backend with WSGI server
5. Set up reverse proxy (nginx)

## Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Check if PostgreSQL is running
   - Verify connection string in .env
   - Ensure database exists

2. **Frontend Build Errors:**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

3. **API CORS Issues:**
   - Check CORS configuration in backend
   - Verify frontend API URL

### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## Support

For questions and support:
- Create an issue in the repository
- Check the API documentation at `/docs`
- Review the code comments and documentation
