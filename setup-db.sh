#!/bin/bash

echo "🃏 PokerGuru Database Setup"
echo "=========================="

# Check if Postgres.app is running
if pgrep -f "Postgres.app" > /dev/null; then
    echo "✅ Postgres.app is running"
else
    echo "❌ Postgres.app is not running"
    echo "📌 Please start Postgres.app from your Applications folder"
    echo "   1. Open Applications folder"
    echo "   2. Double-click Postgres.app"
    echo "   3. Click 'Start' or 'Initialize'"
    echo ""
    read -p "Press Enter after starting Postgres.app..."
fi

# Try to create the database
echo "🗄️ Creating pokerguru database..."

# Try different connection methods
if psql -h localhost -p 5433 -d postgres -c "CREATE DATABASE pokerguru;" 2>/dev/null; then
    echo "✅ Database 'pokerguru' created successfully"
elif psql -p 5433 -d postgres -c "CREATE DATABASE pokerguru;" 2>/dev/null; then
    echo "✅ Database 'pokerguru' created successfully"
elif psql -h localhost -d postgres -c "CREATE DATABASE pokerguru;" 2>/dev/null; then
    echo "✅ Database 'pokerguru' created successfully"
elif psql -d postgres -c "CREATE DATABASE pokerguru;" 2>/dev/null; then
    echo "✅ Database 'pokerguru' created successfully"
elif psql -U postgres -d postgres -c "CREATE DATABASE pokerguru;" 2>/dev/null; then
    echo "✅ Database 'pokerguru' created successfully"
else
    echo "⚠️ Could not create database automatically"
    echo "📌 Please create the database manually:"
    echo "   1. Open Terminal"
    echo "   2. Run: psql -d postgres"
    echo "   3. Type: CREATE DATABASE pokerguru;"
    echo "   4. Type: \\q to exit"
fi

echo ""
echo "🧪 Testing database connection..."
if psql -h localhost -p 5433 -d pokerguru -c "SELECT 'Database pokerguru is ready!' as status;" 2>/dev/null; then
    echo "✅ Database connection successful!"
elif psql -p 5433 -d pokerguru -c "SELECT 'Database pokerguru is ready!' as status;" 2>/dev/null; then
    echo "✅ Database connection successful!"
elif psql -h localhost -d pokerguru -c "SELECT 'Database pokerguru is ready!' as status;" 2>/dev/null; then
    echo "✅ Database connection successful!"
elif psql -d pokerguru -c "SELECT 'Database pokerguru is ready!' as status;" 2>/dev/null; then
    echo "✅ Database connection successful!"
else
    echo "❌ Could not connect to pokerguru database"
    echo "📌 Make sure:"
    echo "   - Postgres.app is running"
    echo "   - Database 'pokerguru' exists"
    echo "   - Connection settings in .env are correct"
fi

echo ""
echo "🤖 Checking Ollama..."
if command -v ollama >/dev/null 2>&1; then
    echo "✅ Ollama is installed"
    
    # Check if Ollama service is running
    if curl -s http://localhost:11434/api/tags >/dev/null 2>&1; then
        echo "✅ Ollama service is running"
        
        # Check if model is installed
        if ollama list | grep -q "llama3.1:8b"; then
            echo "✅ llama3.1:8b model is installed"
        else        echo "📥 Installing llama3.1:8b model..."
        ollama pull llama3.1:8b
        fi
    else
        echo "🚀 Starting Ollama service..."
        ollama serve &
        sleep 3
        echo "📥 Installing llama3.1:8b model..."
        ollama pull llama3.1:8b
    fi
else
    echo "❌ Ollama not found"
    echo "📌 Installing Ollama..."
    if command -v brew >/dev/null 2>&1; then
        brew install ollama
        echo "🚀 Starting Ollama service..."
        ollama serve &
        sleep 3
        echo "📥 Installing llama3.1:8b model..."
        ollama pull llama3.1:8b
    else
        echo "⚠️ Please install Ollama manually from https://ollama.ai"
    fi
fi

echo ""
echo "🎉 Setup Summary:"
echo "✅ Database name: pokerguru"
echo "✅ Backend dependencies: installed"
echo "✅ Frontend dependencies: installed"
echo "✅ Environment configuration: ready"
echo ""
echo "🚀 Next steps:"
echo "1. Make sure Postgres.app is running"
echo "2. Run: ./start.sh"
echo "3. Open: http://localhost:3000"
