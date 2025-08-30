# 🃏 PokerGuru System Architecture Overview

## 🎯 System Purpose
PokerGuru is an AI-powered chatbot system that:

## 🏗️ Complete Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │────│   NestJS Backend │────│   PostgreSQL    │
│   (Port 3000)   │    │   (Port 8000)    │    │   Database      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                │
                       ┌──────────────────┐
                       │   Ollama AI      │
                       │   (Port 11434)   │
                       │   llama3.1:8b    │
                       └──────────────────┘
```

## 📁 Project Structure

```
Pokerguru/
├── 📁 src/                          # Backend source code
│   ├── 📁 modules/
│   │   ├── 📁 chat/                 # Main chat orchestration
│   │   │   ├── chat.controller.ts   # Chat API endpoints
│   │   │   ├── chat.service.ts      # Chat business logic
│   │   │   ├── chat.module.ts       # Chat module definition
│   │   │   ├── 📁 dto/              # Data transfer objects
│   │   │   └── 📁 interfaces/       # TypeScript interfaces
│   │   ├── 📁 intent-checker/       # Intent detection system
│   │   │   ├── intent-checker.controller.ts
│   │   │   ├── intent-checker.service.ts
│   │   │   ├── intent-checker.module.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 interfaces/
│   │   ├── 📁 poker-qa/             # Poker Q&A system
│   │   │   ├── poker-qa.controller.ts
│   │   │   ├── poker-qa.service.ts
│   │   │   ├── poker-qa.module.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 interfaces/
│   │   ├── 📁 ollama-integration/   # AI model integration
│   │   │   ├── ollama.service.ts
│   │   │   └── ollama-integration.module.ts
│   │   └── 📁 database/             # Database entities
│   │       ├── database.module.ts
│   │       └── 📁 entities/
│   │           ├── chat-log.entity.ts
│   │           └── intent-log.entity.ts
│   ├── main.ts                      # Application entry point
│   └── app.module.ts                # Root module
├── 📁 frontend/                     # React frontend
│   ├── 📁 src/
│   │   ├── App.tsx                  # Main chat interface
│   │   ├── App.css                  # Poker-themed styling
│   │   ├── index.tsx                # React entry point
│   │   └── 📁 services/
│   │       └── ChatService.ts       # API communication
│   ├── 📁 public/
│   ├── package.json
│   └── tsconfig.json
├── 📄 Configuration Files
│   ├── package.json                 # Backend dependencies
│   ├── tsconfig.json               # TypeScript config
│   ├── nest-cli.json               # NestJS CLI config
│   ├── .env                        # Environment variables
│   ├── .env.example               # Environment template
│   └── .gitignore                 # Git ignore rules
├── 📄 Scripts & Documentation
│   ├── setup.sh                   # Automated setup script
│   ├── start.sh                   # Start all services
│   ├── stop.sh                    # Stop all services
│   ├── test-system.sh             # System testing script
│   ├── README.md                  # Main documentation
│   ├── API_TESTING.md             # API testing guide
│   └── DEVELOPMENT.md             # Development workflow
```

## 🔄 Data Flow

### 1. User Interaction Flow
```
User Input → Frontend → Backend → Intent Check → Response Generation → Frontend → User
```

### 2. Intent Detection Flow
```
User Message → Intent Checker Service → Keyword/AI Analysis → Intent Result
```

### 3. Poker Q&A Flow
```
Poker Question → Ollama Service → AI Model → Generated Answer → User
```

### 4. Database Logging Flow
```
Every Interaction → Database Entities → PostgreSQL → Analytics/History
```

## 🧩 Core Components

### Backend Modules

#### 1. **ChatModule** 📞
  - Route messages to appropriate handlers
  - Coordinate intent checking and response generation
  - Handle error scenarios gracefully

#### 2. **IntentCheckerModule** 🔍
  - **Keyword-based**: Fast, rule-based detection
  - **AI-based**: Accurate, context-aware detection

#### 3. **PokerQAModule** 🎰
  - Comprehensive poker knowledge base
  - Context-aware prompt engineering
  - Fallback responses for unknown topics

#### 4. **OllamaIntegrationModule** 🤖
  - Health monitoring
  - Error handling and retries
  - Configurable model parameters

#### 5. **DatabaseModule** 🗄️
  - `ChatLog`: Complete conversation history
  - `IntentLog`: Intent detection results

### Frontend Components

#### 1. **Main Chat Interface** 💬

#### 2. **API Service Layer** 🔌

## 🚀 Key Features

### ✅ Intent Detection

### ✅ Poker Knowledge System
  - Hand rankings and probabilities
  - Strategy and gameplay
  - Tournament vs cash game advice
  - Bankroll management
  - Poker psychology

### ✅ Response Quality

### ✅ Data Management

### ✅ User Experience

## 🔧 Configuration & Environment

### Environment Variables
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=pokerguru

# Application
PORT=8000
NODE_ENV=development

# AI Model
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
```

### Dependencies

## 🧪 Testing Strategy

### Automated Tests

### Manual Testing

## 📈 Performance Characteristics

### Response Times

### Scalability

## 🔮 Future Enhancements

### Phase 3 Features

### Technical Improvements

## 💡 Development Philosophy

### Code Quality

### User-Centric Design

This architecture provides a solid foundation for a specialized poker chatbot while maintaining flexibility for future enhancements and scaling.
DB_PORT=5432
