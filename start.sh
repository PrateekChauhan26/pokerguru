#!/bin/bash

echo "🃏 Starting PokerGuru System..."

# Start Ollama if not running
if ! pgrep -f "ollama serve" > /dev/null; then
    echo "🚀 Starting Ollama service..."
    ollama serve &
    sleep 3
fi

# Check database connection
echo "🗄️ Checking database connection..."
DB_STATUS="unknown"
if docker exec pokerguru-postgres psql -U postgres -d pokerguru -c "SELECT 1;" >/dev/null 2>&1; then
    DB_STATUS="connected"
    echo "✅ Database connected successfully"
elif PGPASSWORD=password psql -h localhost -p 5555 -U postgres -d pokerguru -c "SELECT 1;" >/dev/null 2>&1; then
    DB_STATUS="connected"
    echo "✅ Database connected successfully"
else
    echo "⚠️ Database not accessible - the app will try to connect anyway"
    echo "📌 To fix: Run ./setup-postgres-docker.sh to start PostgreSQL"
fi

# Start backend
echo "🚀 Starting backend..."
npm run start:dev &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 8

# Start frontend
echo "🖥️ Starting frontend..."
cd frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 PokerGuru is starting up!"
echo "Backend: http://localhost:3333"
echo "Frontend: http://localhost:3004"
echo ""
if [ "$DB_STATUS" = "connected" ]; then
    echo "✅ Database: Connected"
else
    echo "⚠️ Database: Not connected (start Postgres.app and create 'pokerguru' database)"
fi
echo "✅ Ollama: Running with llama3.1:8b"
echo ""
echo "🃏 Ready to chat about poker!"
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait
