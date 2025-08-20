#!/bin/bash

echo "🐳 PokerGuru PostgreSQL Setup (Docker)"
echo "====================================="

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker or use Postgres.app"
    exit 1
fi

echo "🔍 Checking existing PostgreSQL containers..."

# Check if there's already a PostgreSQL container for PokerGuru
if docker ps -a --format "table {{.Names}}" | grep -q "pokerguru-postgres"; then
    echo "📦 Found existing pokerguru-postgres container"
    
    # Check if it's running
    if docker ps --format "table {{.Names}}" | grep -q "pokerguru-postgres"; then
        echo "✅ Container is already running"
    else
        echo "🚀 Starting existing container..."
        docker start pokerguru-postgres
    fi
else
    echo "📦 Creating new PostgreSQL container for PokerGuru..."
    docker run -d \
        --name pokerguru-postgres \
        -e POSTGRES_DB=pokerguru \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=password \
        -p 5555:5432 \
        postgres:15-alpine
    
    echo "⏳ Waiting for PostgreSQL to start..."
    sleep 5
fi

# Test connection
echo "🧪 Testing database connection..."
sleep 2

if docker exec pokerguru-postgres psql -U postgres -d pokerguru -c "SELECT 'PokerGuru PostgreSQL is ready!' as status;" 2>/dev/null; then
    echo "✅ PostgreSQL container is ready!"
    echo "📋 Connection details:"
    echo "   Host: localhost"
    echo "   Port: 5555"
    echo "   Database: pokerguru"
    echo "   Username: postgres"
    echo "   Password: password"
else
    echo "❌ Connection failed. Let's try to create the database..."
    docker exec pokerguru-postgres createdb -U postgres pokerguru 2>/dev/null || echo "Database might already exist"
    
    # Test again
    if docker exec pokerguru-postgres psql -U postgres -d pokerguru -c "SELECT 'PokerGuru PostgreSQL is ready!' as status;" 2>/dev/null; then
        echo "✅ PostgreSQL container is ready!"
    else
        echo "❌ Setup failed. Please check Docker logs:"
        echo "docker logs pokerguru-postgres"
    fi
fi

echo ""
echo "🎉 PostgreSQL setup complete!"
echo "You can now run: ./start.sh"
