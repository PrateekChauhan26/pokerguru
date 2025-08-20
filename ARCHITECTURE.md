# 🃏 PokerGuru System Architecture Overview

## 🎯 System Purpose
PokerGuru is an AI-powered chatbot system that:
- Analyzes user questions to determine if they're poker-related
- Answers poker questions using AI (Ollama llama3.1:8b)
- Politely rejects non-poker questions
- Logs all interactions for analysis and improvement

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
- **Purpose**: Main orchestration layer
- **Responsibilities**:
  - Route messages to appropriate handlers
  - Coordinate intent checking and response generation
  - Handle error scenarios gracefully
- **Key Files**: `chat.controller.ts`, `chat.service.ts`

#### 2. **IntentCheckerModule** 🔍
- **Purpose**: Determine if messages are poker-related
- **Methods**:
  - **Keyword-based**: Fast, rule-based detection
  - **AI-based**: Accurate, context-aware detection
- **Key Files**: `intent-checker.service.ts`

#### 3. **PokerQAModule** 🎰
- **Purpose**: Generate poker-specific responses
- **Features**:
  - Comprehensive poker knowledge base
  - Context-aware prompt engineering
  - Fallback responses for unknown topics
- **Key Files**: `poker-qa.service.ts`

#### 4. **OllamaIntegrationModule** 🤖
- **Purpose**: Interface with local AI model
- **Features**:
  - Health monitoring
  - Error handling and retries
  - Configurable model parameters
- **Key Files**: `ollama.service.ts`

#### 5. **DatabaseModule** 🗄️
- **Purpose**: Data persistence and analytics
- **Entities**:
  - `ChatLog`: Complete conversation history
  - `IntentLog`: Intent detection results
- **Key Files**: Entity definitions

### Frontend Components

#### 1. **Main Chat Interface** 💬
- Real-time messaging UI
- Poker-themed design with card suits
- Intent confidence display
- Message history with timestamps

#### 2. **API Service Layer** 🔌
- Clean separation between UI and backend
- Error handling and retry logic
- TypeScript interfaces for type safety

## 🚀 Key Features

### ✅ Intent Detection
- **Phase 1**: Keyword-based (fast, reliable for common terms)
- **Phase 2**: AI-based (accurate, context-aware)
- **Confidence scoring**: Shows detection accuracy
- **Fallback handling**: Graceful degradation when AI fails

### ✅ Poker Knowledge System
- Comprehensive poker expertise covering:
  - Hand rankings and probabilities
  - Strategy and gameplay
  - Tournament vs cash game advice
  - Bankroll management
  - Poker psychology

### ✅ Response Quality
- **Context-aware prompting**: Specialized prompts for poker
- **Fallback responses**: When AI is uncertain
- **Consistent tone**: Friendly, educational poker expert

### ✅ Data Management
- **Session tracking**: Maintain conversation context
- **Complete logging**: All interactions recorded
- **Analytics ready**: Data structure for insights

### ✅ User Experience
- **Real-time feedback**: Typing indicators and loading states
- **Visual feedback**: Intent confidence display
- **Responsive design**: Works on desktop and mobile
- **Error handling**: Clear error messages and recovery

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
- **Backend**: NestJS, TypeORM, PostgreSQL, Axios
- **Frontend**: React, TypeScript, Axios
- **AI**: Ollama with llama3.1:8b
- **Database**: PostgreSQL

## 🧪 Testing Strategy

### Automated Tests
- **Unit Tests**: Individual service methods
- **Integration Tests**: API endpoints
- **System Tests**: Complete workflows

### Manual Testing
- **Poker Questions**: Validate expert responses
- **Non-Poker Questions**: Confirm polite rejection
- **Edge Cases**: Boundary conditions and error handling

## 📈 Performance Characteristics

### Response Times
- **Intent Detection**: ~100ms (keyword) / ~2-5s (AI)
- **Poker Q&A**: ~3-10s (depending on complexity)
- **Database Operations**: ~10-50ms

### Scalability
- **Horizontal scaling**: Stateless backend design
- **Database optimization**: Indexed queries
- **Caching opportunities**: Response caching, intent caching

## 🔮 Future Enhancements

### Phase 3 Features
- Hand history analysis
- Real-time coaching
- Tournament tracking
- Multi-language support
- Voice interface
- Advanced analytics dashboard

### Technical Improvements
- Redis caching layer
- WebSocket real-time communication
- Docker containerization
- CI/CD pipeline
- Monitoring and alerting

## 💡 Development Philosophy

### Code Quality
- **Type Safety**: Full TypeScript implementation
- **Modularity**: Clean separation of concerns
- **Testability**: Dependency injection and mocking
- **Documentation**: Comprehensive inline and external docs

### User-Centric Design
- **Expertise Focus**: Specialized poker knowledge
- **Clarity**: Clear intent detection and responses
- **Reliability**: Robust error handling
- **Performance**: Optimized for responsive interaction

This architecture provides a solid foundation for a specialized poker chatbot while maintaining flexibility for future enhancements and scaling.
