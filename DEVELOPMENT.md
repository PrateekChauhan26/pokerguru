# PokerGuru Development Workflow

## 🚀 Quick Start Commands

### Initial Setup
```bash
# Clone and setup
git clone <repository-url>
cd Pokerguru
./setup.sh
```

### Daily Development
```bash
# Start all services
./start.sh

# Run tests
./test-system.sh

# Stop all services
./stop.sh
```

## 📋 Development Checklist

### Before Starting Development
- [ ] PostgreSQL is running
- [ ] Ollama service is running
- [ ] llama3.1:8b model is installed
- [ ] Dependencies are installed (`npm install`)
- [ ] Environment variables are configured

### Development Process
1. **Start Services**: `./start.sh`
2. **Make Changes**: Edit code in your preferred IDE
3. **Test Changes**: Backend auto-reloads with `npm run start:dev`
4. **Test API**: Use `./test-system.sh` or manual testing
5. **Commit Changes**: Follow git workflow

### Testing Workflow
```bash
# Unit tests
npm run test

# Integration tests
./test-system.sh

# Manual API testing (see API_TESTING.md)
curl -X POST http://localhost:8000/chat/message ...
```

## 🔧 Common Development Tasks

### Adding New Intent Keywords
1. Edit `src/modules/intent-checker/intent-checker.service.ts`
2. Add keywords to `pokerKeywords` array
3. Test with new poker terms

### Modifying AI Prompts
1. Edit `src/modules/poker-qa/poker-qa.service.ts`
2. Update `buildPokerPrompt()` method
3. Test with various question types

### Database Schema Changes
1. Update entities in `src/modules/database/entities/`
2. Run migrations (if using migrations)
3. Update API responses if needed

### Frontend Changes
1. Edit components in `frontend/src/`
2. Test in browser at `http://localhost:3000`
3. Check console for errors

## 🐛 Debugging

### Backend Issues
```bash
# Check logs
tail -f logs/application.log

# Debug mode
npm run start:debug

# Database connection
psql -d pokerguru -c "SELECT * FROM chat_logs LIMIT 5;"
```

### Frontend Issues
```bash
# Check browser console
# Check network tab for API calls
# Run frontend tests
cd frontend && npm test
```

### Ollama Issues
```bash
# Check Ollama status
ollama list

# Test Ollama directly
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "What is poker?"
}'
```

## 📊 Monitoring

### Key Metrics to Watch
- Response times for chat endpoints
- Intent detection accuracy
- Database connection health
- Ollama model performance

### Log Locations
- Backend: Console output (development)
- Database: PostgreSQL logs
- Ollama: Console output

## 🔄 Deployment Workflow

### Development → Staging
1. Run full test suite
2. Update environment variables
3. Build frontend: `cd frontend && npm run build`
4. Test in staging environment

### Staging → Production
1. Final testing
2. Update production environment variables
3. Deploy backend and frontend
4. Monitor health checks

## 🧪 Testing Strategy

### Unit Tests
- Service methods
- Utility functions
- Database operations

### Integration Tests
- API endpoints
- Database connections
- External service integrations

### E2E Tests
- Complete user workflows
- Frontend-backend integration
- Error handling scenarios

## 📈 Performance Optimization

### Backend Optimization
- Database query optimization
- Caching frequently accessed data
- Connection pooling
- Response compression

### Frontend Optimization
- Code splitting
- Image optimization
- Bundle size reduction
- Lazy loading

### AI Model Optimization
- Prompt engineering
- Response caching
- Model parameter tuning
- Timeout optimization

## 🔐 Security Considerations

### Development Security
- Environment variable management
- Input validation and sanitization
- Rate limiting implementation
- Error message sanitization

### Production Security
- HTTPS enforcement
- CORS configuration
- Authentication implementation
- Input validation
- SQL injection prevention

## 📝 Code Style Guidelines

### TypeScript/JavaScript
- Use ESLint configuration
- Follow Prettier formatting
- Use meaningful variable names
- Add JSDoc comments for public methods

### Database
- Use descriptive table and column names
- Implement proper indexing
- Use transactions for multi-step operations

### API Design
- RESTful endpoints
- Consistent response formats
- Proper HTTP status codes
- Clear error messages

## 🚦 Git Workflow

### Branch Strategy
```bash
# Feature development
git checkout -b feature/intent-improvement
git commit -m "feat: improve intent detection accuracy"
git push origin feature/intent-improvement
# Create PR

# Bug fixes
git checkout -b fix/poker-odds-calculation
git commit -m "fix: correct pocket aces odds calculation"
```

### Commit Messages
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/updates

## 📚 Resources

### Documentation
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://reactjs.org/docs/)
- [TypeORM Documentation](https://typeorm.io/)
- [Ollama Documentation](https://ollama.ai/docs)

### Poker Resources
- Poker strategy for AI training
- Hand ranking references
- Odds calculation formulas

### Development Tools
- VS Code with recommended extensions
- Postman for API testing
- PostgreSQL GUI tools
- Browser DevTools
