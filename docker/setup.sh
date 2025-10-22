#!/bin/bash

# Supply Hero Development Setup Script

echo "🚀 Setting up Supply Hero Development Environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Detect Docker Compose command (v1 or v2)
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
    echo "📦 Using Docker Compose v1 (docker-compose)"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
    echo "📦 Using Docker Compose v2 (docker compose)"
else
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   For Docker Compose v1: https://docs.docker.com/compose/install/"
    echo "   For Docker Compose v2: https://docs.docker.com/compose/install/"
    exit 1
fi

# Create environment files if they don't exist
if [ ! -f "../backend/.env" ]; then
    echo "📝 Creating backend environment file..."
    cp ../backend/env.example ../backend/.env
fi

if [ ! -f "../frontend/.env.local" ]; then
    echo "📝 Creating frontend environment file..."
    cat > ../frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
fi

# Start the services
echo "🐳 Starting Docker services..."
$DOCKER_COMPOSE up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
$DOCKER_COMPOSE ps

echo "✅ Setup complete!"
echo ""
echo "🌐 Services available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   Database: localhost:5432"
echo "   Redis: localhost:6379"
echo ""
echo "📚 API Documentation: http://localhost:8000/docs"
echo ""
echo "🛠️  To stop services: $DOCKER_COMPOSE down"
echo "🔄 To restart services: $DOCKER_COMPOSE restart"
echo "📊 To view logs: $DOCKER_COMPOSE logs -f"
