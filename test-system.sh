#!/bin/bash

# PokerGuru System Test Script
# This script tests the major components of the PokerGuru system

echo "🧪 Testing PokerGuru System..."

API_URL="http://localhost:8000"
TEST_SESSION="test-$(date +%s)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_test() {
    echo -e "\n🔍 Testing: $1"
}

print_pass() {
    echo -e "${GREEN}✅ PASS: $1${NC}"
}

print_fail() {
    echo -e "${RED}❌ FAIL: $1${NC}"
}

print_warn() {
    echo -e "${YELLOW}⚠️ WARN: $1${NC}"
}

# Test 1: Health Check
print_test "Health Check"
HEALTH_RESPONSE=$(curl -s "$API_URL/chat/health" || echo "ERROR")
if [[ $HEALTH_RESPONSE == *"healthy"* ]]; then
    print_pass "Health check passed"
else
    print_fail "Health check failed: $HEALTH_RESPONSE"
fi

# Test 2: Poker Question (should be accepted)
print_test "Poker Question Recognition"
POKER_RESPONSE=$(curl -s -X POST "$API_URL/chat/message" \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"What are the odds of getting pocket aces?\", \"sessionId\": \"$TEST_SESSION\"}" || echo "ERROR")
  
if [[ $POKER_RESPONSE == *"isPokerRelated\":true"* ]]; then
    print_pass "Poker question correctly identified"
else
    print_fail "Poker question not recognized: $POKER_RESPONSE"
fi

# Test 3: Non-Poker Question (should be rejected)
print_test "Non-Poker Question Rejection"
NON_POKER_RESPONSE=$(curl -s -X POST "$API_URL/chat/message" \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"What is the weather like today?\", \"sessionId\": \"$TEST_SESSION\"}" || echo "ERROR")
  
if [[ $NON_POKER_RESPONSE == *"isPokerRelated\":false"* ]]; then
    print_pass "Non-poker question correctly rejected"
else
    print_fail "Non-poker question not rejected properly: $NON_POKER_RESPONSE"
fi

# Test 4: Intent Detection API
print_test "Intent Detection API"
INTENT_RESPONSE=$(curl -s -X POST "$API_URL/intent/check" \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Should I fold pocket jacks preflop?\", \"sessionId\": \"$TEST_SESSION\"}" || echo "ERROR")
  
if [[ $INTENT_RESPONSE == *"isPokerRelated\":true"* ]]; then
    print_pass "Intent detection API working"
else
    print_fail "Intent detection API failed: $INTENT_RESPONSE"
fi

# Test 5: Direct Poker Q&A API
print_test "Poker Q&A API"
QA_RESPONSE=$(curl -s -X POST "$API_URL/poker/ask" \
  -H "Content-Type: application/json" \
  -d "{\"question\": \"What is a royal flush?\", \"sessionId\": \"$TEST_SESSION\"}" || echo "ERROR")
  
if [[ $QA_RESPONSE == *"answer"* ]]; then
    print_pass "Poker Q&A API working"
else
    print_fail "Poker Q&A API failed: $QA_RESPONSE"
fi

# Test 6: Conversation History
print_test "Conversation History"
sleep 1  # Wait for database writes
HISTORY_RESPONSE=$(curl -s "$API_URL/poker/history?sessionId=$TEST_SESSION" || echo "ERROR")
if [[ $QA_RESPONSE == *"["* ]]; then
    print_pass "Conversation history API working"
else
    print_warn "Conversation history might be empty or failed: $HISTORY_RESPONSE"
fi

# Test 7: Ollama Connection
print_test "Ollama Service"
OLLAMA_RESPONSE=$(curl -s "http://localhost:11434/api/tags" || echo "ERROR")
if [[ $OLLAMA_RESPONSE == *"models"* ]]; then
    print_pass "Ollama service is running"
else
    print_fail "Ollama service not accessible: $OLLAMA_RESPONSE"
fi

echo ""
echo "🏁 Test Summary Complete"
echo "📊 Test Session ID: $TEST_SESSION"
echo ""
echo "If any tests failed, check:"
echo "1. Backend is running (npm run start:dev)"
echo "2. Database is accessible"
echo "3. Ollama service is running (ollama serve)"
echo "4. Required model is installed (ollama pull llama3.1:8b)"
