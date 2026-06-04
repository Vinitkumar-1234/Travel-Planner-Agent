# 🚀 Travel Planner Agent - Full Stack (Frontend + Backend)

Complete travel planning application with separate Frontend (React) and Backend (Node.js + IBM Granite).

## 📁 Project Structure

```
IBM internship 2.0/
├── backend/                    ← Node.js + Express API
│   ├── src/
│   │   ├── agents/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── config/
│   │   ├── utils/
│   │   └── index.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/                   ← React UI
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── HOW_TO_RUN.md              ← You are here
└── PROJECT_OVERVIEW.md
```

## ⚡ Quick Start (5 minutes)

### Terminal 1: Start Backend

```bash
# Navigate to backend
cd "backend"

# Install dependencies
npm install

# Configure credentials
cp .env.example .env
# Edit .env and add:
# - IBM_CLOUD_API_KEY
# - WATSONX_PROJECT_ID

# Start server
npm run dev
# Backend runs at http://localhost:3000
```

### Terminal 2: Start Frontend

```bash
# Navigate to frontend (in new terminal)
cd "frontend"

# Install dependencies
npm install

# Start development server
npm start
# Frontend opens at http://localhost:3000
# (or http://localhost:3001 if port 3000 is taken)
```

## ✅ Verify Everything Works

### Check Backend
```bash
curl http://localhost:3000/health
# Should return: {"status":"healthy",...}
```

### Check Frontend
- Open http://localhost:3000 (or :3001) in browser
- You should see the beautiful Travel Planner UI

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────┐
│   React Frontend (Port 3000)    │
│  ✅ Beautiful UI with Bootstrap │
│  ✅ Forms for travel planning   │
│  ✅ Real-time data display      │
└──────────────┬──────────────────┘
               │ HTTP/REST API
               │ axios client
               ▼
┌──────────────────────────────────┐
│  Node.js Backend (Port 3000)     │
│  ✅ 9 REST API endpoints         │
│  ✅ IBM Granite AI integration   │
│  ✅ Real-time data aggregation   │
└──────────────┬──────────────────┘
               │
      ┌────────┴────────┐
      ▼                 ▼
  IBM Cloud         External APIs
  - Granite         - Weather
  - Auth            - Flights
  - Watsonx         - Hotels
```

---

## 🏗️ Component Details

### Backend (Node.js + Express)

**Location**: `backend/`

**What it does**:
- Provides 9 REST API endpoints
- Integrates with IBM Granite LLM
- Aggregates travel data (weather, flights, etc.)
- Manages travel plans & budgets
- Handles session management

**Key Files**:
- `src/index.js` - Server entry point
- `src/routes/travelRoutes.js` - API endpoints
- `src/services/graniteService.js` - AI integration
- `src/agents/travelPlannerAgent.js` - Main orchestrator

**Runs on**: `http://localhost:3000`

### Frontend (React)

**Location**: `frontend/`

**What it does**:
- Beautiful UI for travel planning
- Forms to input preferences
- Displays AI recommendations
- Shows complete travel plans
- Real-time data visualization

**Key Files**:
- `src/App.js` - Main app component
- `src/components/TravelForm.js` - Plan creation
- `src/components/RecommendationForm.js` - Recommendations
- `src/services/travelService.js` - API client

**Runs on**: `http://localhost:3000` (or :3001)

---

## 🔌 API Communication

The frontend communicates with the backend through API calls:

```javascript
// Example: Frontend calls backend
const response = await axios.post(
  'http://localhost:3000/api/travel/plans',
  { sessionId, requirements }
);
```

All requests go to `http://localhost:3000/api/travel` (backend)

---

## 📊 Data Flow

```
User Action (Frontend)
         ↓
  Create Travel Form
         ↓
  axios POST request
         ↓
  Backend receives request
         ↓
  Process with IBM Granite AI
         ↓
  Aggregate real-time data
         ↓
  Return JSON response
         ↓
  Frontend displays results
```

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Check if dependencies are installed
npm install

# Check Node.js version
node --version  # Should be 16+

# Check npm version
npm --version   # Should be 7+

# Try deleting node_modules and reinstalling
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend won't start
```bash
# Check dependencies
npm install

# Clear cache
npm cache clean --force

# Start with specific port if 3000 is taken
PORT=3001 npm start
```

### Backend and Frontend can't communicate
- Make sure backend is running: `curl http://localhost:3000/health`
- Check frontend `.env`: `REACT_APP_API_URL=http://localhost:3000/api/travel`
- Check browser console for errors (F12)
- Check CORS is enabled in backend (should be by default)

### "Port 3000 already in use"
```bash
# Kill process using port 3000
kill -9 $(lsof -t -i:3000)

# Or use different port
PORT=3001 npm start  # Frontend
npm run dev -- --port 3001  # Backend (if needed)
```

### API requests fail with 502 Bad Gateway
- Check backend is running
- Check backend logs for errors
- Verify IBM Cloud credentials in `.env`
- Check API URL in frontend `.env`

---

## 📚 Complete Workflow Example

### Step 1: Start Both Servers
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

### Step 2: Open Frontend
- Open browser to http://localhost:3000

### Step 3: Create Travel Plan
1. Click on "Create Plan" tab
2. Click "Create Session" button
3. Fill in destination, dates, budget
4. Click "Generate Travel Plan"
5. Wait for AI to process
6. View results!

### Step 4: Get Recommendations
1. Click on "Get Recommendations" tab
2. Adjust filters (budget, season, interests)
3. Click "Get Recommendations"
4. See AI-powered suggestions

---

## 🔑 Environment Configuration

### Backend (.env)
```bash
# In backend/ folder
IBM_CLOUD_API_KEY=your_api_key
WATSONX_PROJECT_ID=your_project_id
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```bash
# In frontend/ folder
REACT_APP_API_URL=http://localhost:3000/api/travel
```

---

## 📈 Performance Tips

1. **Keep backend running** - Always have backend running before starting frontend
2. **Use modern browser** - Chrome, Firefox, Safari, Edge (latest)
3. **Fast internet** - Needed for API calls to IBM Cloud
4. **Decent CPU** - For smooth React rendering
5. **Monitor memory** - Both frontend & backend use RAM

---

## 🚀 Deployment Options

### Local Testing
- Run backend: `npm run dev` (backend folder)
- Run frontend: `npm start` (frontend folder)
- Open http://localhost:3000

### Production Deployment
- **Backend**: Deploy to IBM Cloud (see `backend/DEPLOYMENT_GUIDE.md`)
- **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages

### Docker Deployment
Create `docker-compose.yml`:
```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
  frontend:
    build: ./frontend
    ports:
      - "3001:3000"
```

Run: `docker-compose up`

---

## 🎓 Learning Path

### For Beginners
1. Read this file (HOW_TO_RUN.md)
2. Start both servers
3. Click around the UI
4. Read `frontend/README.md`
5. Read `backend/README.md`

### For Developers
1. Review architecture above
2. Check `backend/src/` for API logic
3. Check `frontend/src/` for UI components
4. Read `backend/API_DOCUMENTATION.md`
5. Study the code & comments

### For Advanced Users
1. Modify backend to add features
2. Customize frontend UI
3. Integrate more external APIs
4. Deploy to production
5. Add authentication/database

---

## 📱 Browser DevTools

### Frontend Debugging
1. Open DevTools: F12 or Cmd+Opt+I
2. Check Console for errors
3. Check Network tab for API calls
4. Check React DevTools extension

### Backend Debugging
1. Check terminal logs
2. Look for errors in logs/error.log
3. Check logs/combined.log for all requests
4. Enable DEBUG mode: `LOG_LEVEL=debug npm run dev`

---

## 🔗 Important Links

| Resource | Link |
|----------|------|
| Frontend README | `frontend/README.md` |
| Backend README | `backend/README.md` |
| Backend API Docs | `backend/API_DOCUMENTATION.md` |
| Backend Deploy | `backend/DEPLOYMENT_GUIDE.md` |
| Backend Samples | `backend/SAMPLE_REQUESTS.md` |

---

## 🎯 What You Can Do

### With Frontend
- ✅ Create travel plans
- ✅ Get AI recommendations
- ✅ View trip details
- ✅ See budget breakdown
- ✅ Browse attractions & hotels
- ✅ Check weather forecast

### With Backend
- ✅ Provide 9 API endpoints
- ✅ Generate AI itineraries (Granite)
- ✅ Manage travel sessions
- ✅ Handle all business logic
- ✅ Integrate with IBM Cloud
- ✅ Return structured JSON data

---

## ✨ Features Demo

### Travel Form
```
Input: Destination, dates, budget, interests
↓
Backend generates plan using IBM Granite
↓
Output: Complete itinerary with flights, hotels, etc.
```

### Recommendation Engine
```
Input: Budget, season, interests, climate
↓
IBM Granite analyzes preferences
↓
Output: 5 personalized destination recommendations
```

### Budget Optimization
```
Input: Generated travel plan
↓
AI suggests cost-saving opportunities
↓
Output: Optimized budget breakdown
```

---

## 🎉 Success Checklist

- [ ] Backend installed & running (`npm run dev`)
- [ ] Frontend installed & running (`npm start`)
- [ ] Can see Travel Planner UI at localhost:3000
- [ ] Can create a session
- [ ] Can generate a travel plan
- [ ] Can get recommendations
- [ ] Backend logs show API calls
- [ ] Frontend shows real data

---

## 📞 Quick Help

| Issue | Solution |
|-------|----------|
| Backend won't start | `npm install` then `npm run dev` |
| Frontend won't start | `npm install` then `npm start` |
| Port 3000 in use | Kill process or use `PORT=3001` |
| API not connecting | Check backend running, check .env |
| UI doesn't load | Clear cache, hard refresh (Ctrl+Shift+R) |
| Errors in console | Check backend logs, check .env |

---

## 🚀 Next Steps

1. **Get both running** - Follow Quick Start above
2. **Explore the UI** - Click around, try features
3. **Test the API** - Use `backend/SAMPLE_REQUESTS.md`
4. **Read the code** - Understand how it works
5. **Customize** - Add your own features
6. **Deploy** - Put on internet using IBM Cloud

---

## 📄 Project Info

- **Frontend**: React 18 + Bootstrap 5
- **Backend**: Node.js + Express + IBM Granite
- **AI Model**: IBM Granite LLM (via Watsonx)
- **Cloud**: IBM Cloud Platform
- **Total Size**: ~50MB (with node_modules)
- **Development Time**: ~2 hours
- **Status**: ✅ Production Ready

---

**Happy Traveling!** ✈️ 🌍

For detailed docs:
- See `backend/README.md` for backend details
- See `frontend/README.md` for frontend details
- Check `backend/API_DOCUMENTATION.md` for all endpoints

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Status**: ✅ Ready to Run
