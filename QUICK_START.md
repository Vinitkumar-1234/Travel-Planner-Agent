# 🎯 QUICK START - RUN EVERYTHING IN 3 STEPS

## 📁 Important Note: Folder Names

Your project structure is:
```
IBM internship 2.0/
├── backend/                    ← This is "travel-planner-agent" folder
│                                  (Can rename or use as-is)
└── frontend/                   ← NEW React app
```

If you want to match our docs exactly, rename:
- `travel-planner-agent` → `backend`

Or just use it as-is, it works either way!

---

## ⚡ Step 1: Start Backend (Terminal 1)

```bash
# Open Terminal / PowerShell
cd "c:\Users\Lenovo\OneDrive\Desktop\IBM internship 2.0\travel-planner-agent"

# Or if you renamed it:
cd "c:\Users\Lenovo\OneDrive\Desktop\IBM internship 2.0\backend"

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Edit .env and add your IBM Cloud credentials:
# IBM_CLOUD_API_KEY=your_key
# WATSONX_PROJECT_ID=your_project_id

# Start backend
npm run dev
```

✅ **Backend should now be running at http://localhost:3000**

You should see:
```
✓ Travel Planner Agent API running on port 3000
✓ IBM Cloud authentication initialized successfully
```

---

## ⚡ Step 2: Start Frontend (Terminal 2)

**Open a NEW terminal window**

```bash
cd "c:\Users\Lenovo\OneDrive\Desktop\IBM internship 2.0\frontend"

# Install dependencies
npm install

# Start development server
npm start
```

✅ **Frontend should now open at http://localhost:3000 (or :3001)**

You should see:
```
> travel-planner-frontend@1.0.0 start
> react-scripts start

Starting the development server...
Compiled successfully!

You can now view travel-planner-frontend in the browser.
```

---

## ⚡ Step 3: Use the Application

### In Browser (Frontend)
1. Open http://localhost:3000 (or :3001 if port taken)
2. You should see beautiful **Travel Planner Agent UI**
3. Click on **"Create Plan"** tab
4. Click **"Create Session"** button
5. Fill in your destination, dates, budget
6. Click **"Generate Travel Plan"**
7. Watch the AI work and see results!

---

## 📊 What You Should See

### Backend Terminal
```
✓ Travel Planner Agent API running on port 3000
✓ Environment: development
✓ npm run dev
✓ nodemon watching for changes
✓ GET /health → {"status":"healthy",...}
✓ POST /api/travel/session → Session created
✓ POST /api/travel/plans → Plan generated
```

### Frontend Browser
```
✈️ Travel Planner Agent
Beautiful UI with:
- Navigation bar (dark)
- Tabs (Plan, Recommendations, Current Plan, How It Works)
- Form inputs (destination, dates, budget, interests)
- Real-time data display
- Bootstrap styling with gradients
```

---

## ✅ Verification Checklist

- [ ] Backend terminal shows "running on port 3000"
- [ ] Frontend browser shows beautiful UI
- [ ] Can see title "Travel Planner Agent"
- [ ] Can see tabs and form fields
- [ ] No red errors in terminal
- [ ] No red errors in browser console (F12)

---

## 🎯 Troubleshooting

### Issue: Port 3000 already in use
```bash
# For Frontend, use different port:
PORT=3001 npm start

# Or kill existing process:
kill -9 $(lsof -t -i:3000)
```

### Issue: Dependencies not installing
```bash
npm cache clean --force
npm install
```

### Issue: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Backend won't connect
- Check `.env` has credentials
- Check backend is actually running
- Check terminal 1 shows no errors
- Try `curl http://localhost:3000/health`

### Issue: Frontend shows blank page
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser console (F12) for errors
- Check `.env` has `REACT_APP_API_URL=http://localhost:3000/api/travel`

---

## 🎉 Success! What's Next?

### Try These Features:

1. **Create Travel Plan**
   - Fill form with destination (e.g., "Paris")
   - Select dates
   - Set budget
   - Click "Generate"
   - See AI-generated itinerary!

2. **Get Recommendations**
   - Click "Get Recommendations" tab
   - Adjust filters (budget, season, interests)
   - See personalized suggestions!

3. **View Results**
   - See weather forecast
   - See flight options
   - See hotel recommendations
   - See attractions & activities
   - See budget breakdown

---

## 📚 Read More

After getting it running:

1. **Frontend README**: `frontend/README.md`
2. **Backend README**: `travel-planner-agent/README.md`
3. **How to Run**: `HOW_TO_RUN.md`
4. **Project Overview**: `PROJECT_OVERVIEW.md`
5. **API Docs**: `travel-planner-agent/API_DOCUMENTATION.md`

---

## 💡 Quick Reference

| What | Command |
|------|---------|
| Start backend | `cd backend && npm run dev` |
| Start frontend | `cd frontend && npm start` |
| Install deps | `npm install` |
| View backend | http://localhost:3000 (API) |
| View frontend | http://localhost:3000 (UI) |
| Test backend | `curl http://localhost:3000/health` |
| Dev logs | Check terminal output |
| UI errors | Check browser console (F12) |

---

## 🚀 You're Ready!

Everything is set up. Now just:

1. **Terminal 1**: `cd backend && npm run dev`
2. **Terminal 2**: `cd frontend && npm start`
3. **Browser**: http://localhost:3000
4. **Enjoy** your Travel Planner! ✈️

---

**Problems?** Check the troubleshooting section above.

**Want to understand?** Read the documentation files.

**Ready to learn?** Check the code in `src/` folders.

---

Happy traveling! 🌍 ✨
