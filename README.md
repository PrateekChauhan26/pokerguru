# 🃏 PokerGuru AI Chatbot System

A complete full-stack AI chatbot system specialized in poker knowledge and assistance.

## 🎯 Overview

PokerGuru is an intelligent poker assistant that:
- ✅ Analyzes user intent to determine if questions are poker-related
- ✅ Answers poker questions using AI (Ollama with llama3.1:8b)
- ✅ Politely rejects non-poker questions
- ✅ Logs all interactions in PostgreSQL
- ✅ Provides both keyword-based and AI-based intent detection

## 🏗️ Architecture

### Backend (NestJS)
```
src/
├── modules/
│   ├── chat/                 # Main chat orchestration
│   ├── intent-checker/       # Intent detection (keyword + AI)
│   ├── poker-qa/            # Poker Q&A handling
│   ├── ollama-integration/  # AI model integration
│   └── database/            # Database entities & module
├── main.ts                  # Application entry point
└── app.module.ts           # Root module
```

### Frontend (React TypeScript)
```
src/
├── components/             # React components
├── services/              # API service layer
└── App.tsx               # Main chat interface
```

## 🚀 Quick Start

### Prerequisites
1. **Node.js** (v18+)
2. **PostgreSQL** (v13+)
3. **Ollama** with llama3.1:8b model

### 1. Install Ollama and Model
```bash
# Install Ollama (macOS)
brew install ollama

# Start Ollama service
ollama serve

# Pull the required model
ollama pull llama3.1:8b
```

### 2. Setup Database
```bash
# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Create database
createdb pokerguru

# Or connect to existing PostgreSQL and create database
psql -U postgres
CREATE DATABASE pokerguru;
\q
```

### 3. Backend Setup
```bash
# Navigate to project root
cd /Users/prateekchauhan/Desktop/Pokerguru

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start backend
npm run start:dev
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

## 🔧 Environment Configuration

### Backend (.env)
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=pokerguru

# Application Configuration
PORT=8000
NODE_ENV=development

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000
```

## 📚 API Endpoints

### Chat API
- `POST /chat/message` - Send a message to the chatbot
- `GET /chat/health` - Check system health

### Intent Detection API
- `POST /intent/check` - Check intent using keywords
- `POST /intent/check-ai` - Check intent using AI

### Poker Q&A API
- `POST /poker/ask` - Ask a poker question directly
- `GET /poker/history?sessionId=xxx` - Get conversation history

## 🧠 Intent Detection

### Phase 1: Keyword-Based
Uses predefined poker keywords including:
- Basic terms: poker, holdem, omaha, flop, turn, river
- Actions: bet, raise, call, fold, check, all-in
- Hands: royal flush, straight flush, full house, etc.
- Strategy: position, odds, bankroll, variance

### Phase 2: AI-Based
Uses Ollama's llama3.1:8b model with specialized prompts for more accurate intent classification.

## 🎮 Usage Examples

### Poker Questions (Accepted)
- "What are the odds of getting pocket aces?"
- "How should I play a flush draw on the flop?"
- "What's the difference between tournament and cash game strategy?"

### Non-Poker Questions (Rejected)
- "What's the weather like?"
- "How do I cook pasta?"
- "Tell me about sports"

## 🎨 Frontend Features

- **Real-time chat interface** with poker-themed design
- **Intent confidence display** showing detection accuracy
- **Toggle between keyword and AI intent detection**
- **Message history** with timestamps
- **Responsive design** for mobile and desktop
- **Typing indicators** and loading states

## 🗄️ Database Schema

### chat_logs
- `id` (UUID) - Primary key
- `userMessage` (TEXT) - User's input
- `botResponse` (TEXT) - Bot's response
- `isPokerRelated` (BOOLEAN) - Intent result
- `intentResult` (VARCHAR) - Intent classification
- `sessionId` (VARCHAR) - Session identifier
- `createdAt` (TIMESTAMP) - Creation time

### intent_logs
- `id` (UUID) - Primary key
- `userInput` (TEXT) - User's input
- `isPokerRelated` (BOOLEAN) - Intent result
- `detectionMethod` (VARCHAR) - 'keyword' or 'ai'
- `confidenceScore` (FLOAT) - Confidence level
- `sessionId` (VARCHAR) - Session identifier
- `createdAt` (TIMESTAMP) - Creation time

## 🔍 Testing

### Backend Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Manual Testing
1. **Intent Detection**: Test with poker and non-poker questions
2. **Q&A System**: Verify poker knowledge responses
3. **Database Logging**: Check conversation persistence
4. **Ollama Integration**: Ensure AI model connectivity

## 📈 Performance & Monitoring

### Health Checks
- Database connectivity
- Ollama service status
- API response times
- Error rates

### Logging
- All user interactions logged
- Intent detection results tracked
- System errors captured
- Performance metrics recorded

## 🚨 Troubleshooting

### Common Issues

1. **Ollama Connection Failed**
   ```bash
   # Check if Ollama is running
   curl http://localhost:11434/api/tags
   
   # Restart Ollama
   ollama serve
   ```

2. **Database Connection Error**
   ```bash
   # Check PostgreSQL status
   brew services list | grep postgresql
   
   # Restart PostgreSQL
   brew services restart postgresql
   ```

3. **Model Not Found**
   ```bash
   # List available models
   ollama list
   
   # Pull required model
   ollama pull llama3.1:8b
   ```

## 🔮 Future Enhancements

### Phase 3 Features
- [ ] **Advanced Poker Knowledge Base** - Integrate poker strategy databases
- [ ] **Multi-language Support** - Support for different languages
- [ ] **Voice Interface** - Speech-to-text and text-to-speech
- [ ] **Hand Analysis** - Upload hand histories for analysis
- [ ] **Tournament Tracking** - Track poker tournament results
- [ ] **Real-time Coaching** - Live game assistance
- [ ] **WebSocket Support** - Real-time bidirectional communication
- [ ] **User Authentication** - Personal conversation history
- [ ] **Analytics Dashboard** - Usage statistics and insights

### Technical Improvements
- [ ] **Redis Caching** - Improve response times
- [ ] **Rate Limiting** - Prevent abuse
- [ ] **Docker Containers** - Easy deployment
- [ ] **CI/CD Pipeline** - Automated testing and deployment
- [ ] **API Documentation** - Swagger/OpenAPI specs
- [ ] **Monitoring** - Application performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Poker Playing! 🃏🎰♠️♥️♦️♣️**
