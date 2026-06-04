# Travel Planner Agent - Quick Reference Guide

## 🚀 Get Started in 5 Minutes

### 1. Setup
```bash
cd travel-planner-agent
npm install
cp .env.example .env
# Edit .env with IBM Cloud credentials
```

### 2. Run
```bash
npm run dev
# Server starts at http://localhost:3000
```

### 3. Test
```bash
curl http://localhost:3000/health
```

---

## 📚 Documentation Map

| Need | File | Link |
|------|------|------|
| Overview | README.md | Start here |
| API Reference | API_DOCUMENTATION.md | All endpoints |
| Code Examples | SAMPLE_REQUESTS.md | 9 detailed examples |
| Deploy to Cloud | DEPLOYMENT_GUIDE.md | IBM Cloud steps |
| Architecture | PROJECT_SUMMARY.md | Deep dive |
| This guide | QUICK_REFERENCE.md | Quick lookup |

---

## 🔑 Key Concepts

### What is Travel Planner Agent?
AI-powered assistant that creates personalized travel plans using IBM Granite LLM.

### How does it work?
1. User provides travel preferences
2. System generates recommendations using AI
3. Real-time data (weather, flights, hotels) is integrated
4. Budget optimization is performed
5. Complete itinerary is created

### Why IBM Granite?
- Advanced language understanding
- Multi-step reasoning
- Cost-effective
- Easy integration with IBM Cloud

---

## 🏗️ Architecture at a Glance

```
┌─────────────────────────────────────────┐
│         Express REST API                │
│  (9 endpoints for travel planning)      │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
  ┌────▼────┐    ┌──────▼──────┐
  │ Granite  │    │ Travel Data │
  │ Service  │    │ Service     │
  └────┬────┘    └──────┬──────┘
       │                │
  ┌────▼────────────────▼────┐
  │ Travel Planner Agent     │
  │ (Orchestrator)           │
  └──────────────────────────┘
```

---

## 📋 API Quick Reference

### Initialize Session
```bash
POST /api/travel/session
Body: { "userId": "user1", "preferences": {} }
```

### Generate Plan
```bash
POST /api/travel/plans
Body: {
  "sessionId": "...",
  "requirements": {
    "destination": "Paris",
    "duration": 7,
    "budget": 3000,
    "travelers": 2,
    "interests": ["history", "food"]
  }
}
```

### Get Recommendations
```bash
POST /api/travel/recommendations
Body: {
  "budget": 2500,
  "season": "summer",
  "interests": ["beaches"],
  "duration": 7
}
```

### Optimize Budget
```bash
POST /api/travel/plans/{planId}/optimize
```

### Get Updates
```bash
GET /api/travel/plans/{planId}/updates
```

---

## 🔧 Configuration

### Required Environment Variables
```bash
IBM_CLOUD_API_KEY=<your-api-key>
WATSONX_PROJECT_ID=<your-project-id>
WATSON_ASSISTANT_API_KEY=<optional>
OPENWEATHER_API_KEY=<optional>
PORT=3000
NODE_ENV=development
```

### Optional Variables
```bash
GOOGLE_MAPS_API_KEY=<your-key>
AMADEUS_CLIENT_ID=<your-id>
AMADEUS_CLIENT_SECRET=<your-secret>
DATABASE_URL=<your-database>
REDIS_URL=<your-redis>
```

---

## 🐛 Debugging

### Check Logs
```bash
tail -f combined.log      # All logs
tail -f error.log         # Errors only
```

### Verify Connection
```bash
curl http://localhost:3000/health
```

### Test API
```bash
# See SAMPLE_REQUESTS.md for complete examples
curl -X POST http://localhost:3000/api/travel/session \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","preferences":{}}'
```

### Enable Debug Logging
```bash
# In src/config/logger.js or .env
LOG_LEVEL=debug
```

---

## 📁 Important Files

### Code
- **src/agents/travelPlannerAgent.js** - Main logic
- **src/services/graniteService.js** - AI integration
- **src/services/travelDataService.js** - Data integration
- **src/routes/travelRoutes.js** - API routes
- **src/index.js** - App entry point

### Config
- **.env.example** - Environment template
- **package.json** - Dependencies
- **.eslintrc.json** - Code style

### Documentation
- **README.md** - Full overview
- **API_DOCUMENTATION.md** - Detailed API
- **SAMPLE_REQUESTS.md** - Code examples

---

## 🎯 Common Tasks

### Add New API Endpoint
1. Create handler in `travelRoutes.js`
2. Add validation middleware
3. Call agent/service methods
4. Return JSON response
5. Test with curl

### Add New External API
1. Create service in `src/services/`
2. Implement fetch/integration logic
3. Add error handling
4. Update travelDataService aggregator
5. Test with sample data

### Deploy to IBM Cloud
```bash
# See DEPLOYMENT_GUIDE.md for full steps
ibmcloud login
ibmcloud cf push
```

### Run Tests
```bash
npm test
```

### Check Code Style
```bash
npm run lint
```

---

## 🚨 Common Issues

### "IBM_CLOUD_API_KEY not configured"
**Solution**: Update .env with your API key
```bash
cp .env.example .env
# Edit .env with real credentials
```

### "Cannot get access token"
**Solution**: Verify API key and authentication URL
```bash
# Test IBM Cloud login
ibmcloud login
ibmcloud iam api-key-create test
```

### "Port 3000 already in use"
**Solution**: Change port in .env or kill process
```bash
# Change port
PORT=3001 npm start

# Or kill existing process
kill -9 $(lsof -t -i:3000)
```

### "Module not found"
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Performance Tips

- Use connection pooling for external APIs
- Implement caching with Redis
- Add database indexing
- Monitor memory usage
- Set up rate limiting
- Use load balancing for scaling

---

## 🔐 Security Checklist

- [ ] API keys in .env (not in code)
- [ ] HTTPS enabled in production
- [ ] Input validation on all endpoints
- [ ] CORS configured properly
- [ ] No sensitive data in logs
- [ ] Authentication implemented (JWT)
- [ ] Rate limiting enabled
- [ ] Error messages sanitized

---

## 📚 Learning Resources

### IBM Cloud
- https://cloud.ibm.com/docs
- https://www.ibm.com/watsonx

### Node.js/Express
- https://expressjs.com
- https://nodejs.org/docs

### REST APIs
- https://restfulapi.net
- https://jsonapi.org

---

## 🎓 Next Steps

1. **Read README.md** - Understand project
2. **Review API_DOCUMENTATION.md** - Learn endpoints
3. **Check SAMPLE_REQUESTS.md** - See examples
4. **Try SAMPLE_REQUESTS** - Test locally
5. **Review CODE** - Understand implementation
6. **Customize** - Modify for your needs
7. **Deploy** - Follow DEPLOYMENT_GUIDE.md

---

## 💬 Quick Answers

**Q: How do I add my IBM Cloud credentials?**
A: Edit `.env` file with IBM_CLOUD_API_KEY and WATSONX_PROJECT_ID

**Q: How do I test the API?**
A: Use curl commands in SAMPLE_REQUESTS.md or Postman

**Q: How do I deploy?**
A: Follow DEPLOYMENT_GUIDE.md for IBM Cloud steps

**Q: Where are the logs?**
A: Check `combined.log` and `error.log` files

**Q: How do I add new features?**
A: Create services in `src/services/`, routes in `src/routes/`

**Q: How do I handle errors?**
A: All endpoints return `{ success: false, error: "..." }`

**Q: Can I use this in production?**
A: Yes, but add database persistence and authentication first

---

## 🏁 Summary

**You have a complete Travel Planner Agent with:**
- ✅ IBM Granite LLM integration
- ✅ 9 REST API endpoints
- ✅ Real-time data integration
- ✅ Comprehensive documentation
- ✅ Deployment-ready code
- ✅ Production architecture

**Get started**: Run `npm install` and `npm run dev`

---

**Version**: 1.0.0 | **Status**: Ready | **Last Updated**: June 2024
