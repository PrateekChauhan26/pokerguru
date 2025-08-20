#!/bin/bash

# PokerGuru Setup Script
# This script sets up the complete PokerGuru environment

echo "🃏 Setting up PokerGuru AI Chatbot System..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_warning "This setup script is optimized for macOS. You may need to modify commands for other systems."
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    print_status "Node.js found: $NODE_VERSION"
else
    print_error "Node.js not found. Please install Node.js v18+ from https://nodejs.org/"
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    print_status "npm found: $NPM_VERSION"
else
    print_error "npm not found. Please install npm."
    exit 1
fi

# Check PostgreSQL
if command_exists psql; then
    PSQL_VERSION=$(psql --version)
    print_status "PostgreSQL found: $PSQL_VERSION"
else
    print_warning "PostgreSQL not found. Installing via Homebrew..."
    if command_exists brew; then
        brew install postgresql
        brew services start postgresql
        print_status "PostgreSQL installed and started"
    else
        print_error "Homebrew not found. Please install PostgreSQL manually."
        exit 1
    fi
fi

# Check Ollama
if command_exists ollama; then
    print_status "Ollama found"
else
    print_warning "Ollama not found. Installing via Homebrew..."
    if command_exists brew; then
        brew install ollama
        print_status "Ollama installed"
    else
        print_error "Homebrew not found. Please install Ollama manually from https://ollama.ai/"
        exit 1
    fi
fi

# Start Ollama service
echo "🚀 Starting Ollama service..."
ollama serve &
OLLAMA_PID=$!
sleep 5

# Pull required model
echo "📥 Pulling llama3.1:8b model..."
ollama pull llama3.1:8b
if [ $? -eq 0 ]; then
    print_status "Model downloaded successfully"
else
    print_error "Failed to download model"
    exit 1
fi

# Setup database
echo "🗄️ Setting up database..."
createdb pokerguru 2>/dev/null
if [ $? -eq 0 ]; then
    print_status "Database 'pokerguru' created"
else
    print_warning "Database 'pokerguru' might already exist"
fi

# Setup backend
echo "⚙️ Setting up backend..."
cd "$(dirname "$0")"

# Install backend dependencies
npm install
if [ $? -eq 0 ]; then
    print_status "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=pokerguru

# Application Configuration
PORT=8000
NODE_ENV=development

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
EOL
    print_status ".env file created"
    print_warning "Please update the database password in .env if needed"
fi

# Setup frontend
echo "🖥️ Setting up frontend..."
cd frontend

# Install frontend dependencies
npm install
if [ $? -eq 0 ]; then
    print_status "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

# Create frontend .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    echo "REACT_APP_API_URL=http://localhost:8000" > .env
    print_status "Frontend .env file created"
fi

cd ..

# Create start script
echo "📜 Creating start script..."
cat > start.sh << 'EOL'
#!/bin/bash

echo "🃏 Starting PokerGuru System..."

# Start Ollama if not running
if ! pgrep -f "ollama serve" > /dev/null; then
    echo "Starting Ollama service..."
    ollama serve &
    sleep 3
fi

# Start backend
echo "Starting backend..."
npm run start:dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend
echo "Starting frontend..."
cd frontend
npm start &
FRONTEND_PID=$!

echo "🎉 PokerGuru is starting up!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait
EOL

chmod +x start.sh
print_status "Start script created (./start.sh)"

# Create stop script
echo "📜 Creating stop script..."
cat > stop.sh << 'EOL'
#!/bin/bash

echo "🛑 Stopping PokerGuru System..."

# Kill processes by port
echo "Stopping backend (port 8000)..."
lsof -ti:8000 | xargs kill -9 2>/dev/null

echo "Stopping frontend (port 3000)..."
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo "Stopping Ollama service..."
pkill -f "ollama serve" 2>/dev/null

echo "✅ All services stopped"
EOL

chmod +x stop.sh
print_status "Stop script created (./stop.sh)"

# Test Ollama connection
echo "🧪 Testing Ollama connection..."
sleep 2
if curl -s http://localhost:11434/api/tags > /dev/null; then
    print_status "Ollama is running and accessible"
else
    print_error "Ollama connection test failed"
fi

# Summary
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Review and update .env files if needed"
echo "2. Run './start.sh' to start all services"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Ask PokerGuru any poker-related questions!"
echo ""
echo "📚 Available commands:"
echo "  ./start.sh  - Start all services"
echo "  ./stop.sh   - Stop all services"
echo ""
echo "🔧 Manual commands:"
echo "  Backend: npm run start:dev"
echo "  Frontend: cd frontend && npm start"
echo "  Ollama: ollama serve"
echo ""
echo "Happy poker playing! 🃏🎰"
