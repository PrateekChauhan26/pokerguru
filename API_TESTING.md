# PokerGuru API Testing

This document provides examples for testing the PokerGuru API endpoints.

## Base URL
```
http://localhost:8000
```

## Authentication
No authentication required for testing.

## Endpoints

### 1. Health Check
```bash
curl -X GET http://localhost:8000/chat/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "services": {
    "database": true,
    "ollama": true,
    "intentChecker": true,
    "pokerQA": true
  }
}
```

### 2. Chat Message (Main Endpoint)
```bash
curl -X POST http://localhost:8000/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the odds of getting pocket aces?",
    "sessionId": "test-session-123",
    "useAIIntent": false
  }'
```

**Expected Response (Poker Question):**
```json
{
  "message": "The odds of getting pocket aces (AA) are approximately 1 in 221, or about 0.45%. This means you'll get pocket aces roughly once every 221 hands dealt...",
  "isPokerRelated": true,
  "intentConfidence": 0.8,
  "responseType": "poker_answer",
  "timestamp": "2025-07-19T...",
  "sessionId": "test-session-123"
}
```

### 3. Non-Poker Question
```bash
curl -X POST http://localhost:8000/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the weather like today?",
    "sessionId": "test-session-123",
    "useAIIntent": false
  }'
```

**Expected Response (Non-Poker):**
```json
{
  "message": "I'm PokerGuru, your poker assistant! I can only help with poker-related questions. Feel free to ask me about poker strategies, rules, odds, or any other poker topics! 🃏",
  "isPokerRelated": false,
  "intentConfidence": 0.1,
  "responseType": "rejection",
  "timestamp": "2025-07-19T...",
  "sessionId": "test-session-123"
}
```

### 4. Intent Check (Keyword-based)
```bash
curl -X POST http://localhost:8000/intent/check \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Should I fold pocket jacks preflop?",
    "sessionId": "test-session-123"
  }'
```

**Expected Response:**
```json
{
  "isPokerRelated": true,
  "confidence": 0.6,
  "method": "keyword",
  "message": "Found poker keywords: poker, fold, preflop"
}
```

### 5. Intent Check (AI-based)
```bash
curl -X POST http://localhost:8000/intent/check-ai \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Should I fold pocket jacks preflop?",
    "sessionId": "test-session-123"
  }'
```

**Expected Response:**
```json
{
  "isPokerRelated": true,
  "confidence": 0.95,
  "method": "ai",
  "message": "poker strategy question about preflop play"
}
```

### 6. Direct Poker Question
```bash
curl -X POST http://localhost:8000/poker/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Explain the concept of pot odds",
    "sessionId": "test-session-123"
  }'
```

**Expected Response:**
```json
{
  "answer": "Pot odds are a fundamental concept in poker that helps you determine whether a call is profitable...",
  "confidence": 0.8,
  "timestamp": "2025-07-19T...",
  "sessionId": "test-session-123"
}
```

### 7. Conversation History
```bash
curl -X GET "http://localhost:8000/poker/history?sessionId=test-session-123"
```

**Expected Response:**
```json
[
  {
    "id": "uuid-1",
    "userMessage": "What are the odds of getting pocket aces?",
    "botResponse": "The odds of getting pocket aces...",
    "isPokerRelated": true,
    "intentResult": "poker_question",
    "sessionId": "test-session-123",
    "createdAt": "2025-07-19T..."
  }
]
```

## Test Cases

### Poker-Related Messages (Should be Accepted)
- "What are the best starting hands in Texas Hold'em?"
- "How do I calculate pot odds?"
- "When should I bluff?"
- "What's the difference between tournaments and cash games?"
- "Explain the concept of position in poker"
- "How do I manage my bankroll?"

### Non-Poker Messages (Should be Rejected)
- "What's the weather like?"
- "How do I cook pasta?"
- "Tell me about the stock market"
- "What time is it?"
- "Help me with my homework"

### Edge Cases
- "What's the best poker book?" (Should be accepted)
- "Is poker gambling?" (Should be accepted)
- "Can you help me with blackjack?" (Should be rejected)
- "What are the rules of poker?" (Should be accepted)

## Error Responses

### Invalid Request
```json
{
  "statusCode": 400,
  "message": ["message should not be empty"],
  "error": "Bad Request"
}
```

### Server Error
```json
{
  "message": "I'm sorry, I'm having some technical difficulties right now. Please try again in a moment! 🤖",
  "isPokerRelated": false,
  "intentConfidence": 0,
  "responseType": "error",
  "timestamp": "2025-07-19T...",
  "sessionId": "test-session-123"
}
```

## Testing with Different Models

To test with AI intent detection, set `useAIIntent: true` in your requests:

```bash
curl -X POST http://localhost:8000/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Should I call with a flush draw?",
    "sessionId": "test-session-123",
    "useAIIntent": true
  }'
```

## Performance Testing

For load testing, you can use tools like Apache Bench:

```bash
# Test 100 requests with 10 concurrent connections
ab -n 100 -c 10 -H "Content-Type: application/json" \
  -p test-data.json http://localhost:8000/chat/message
```

Where `test-data.json` contains:
```json
{
  "message": "What are pot odds?",
  "sessionId": "load-test"
}
```
