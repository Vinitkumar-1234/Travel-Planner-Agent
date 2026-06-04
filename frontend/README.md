# Travel Planner Agent - Frontend (React)

Beautiful, responsive React frontend for the Travel Planner Agent.

## 🎨 Features

- ✅ Modern React with functional components & hooks
- ✅ Bootstrap 5 for responsive design
- ✅ Create personalized travel plans
- ✅ Get AI-powered destination recommendations
- ✅ View weather, flights, hotels, attractions
- ✅ Budget breakdown & cost optimization
- ✅ Real-time API integration
- ✅ Beautiful gradients & animations

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TravelForm.js        # Create travel plan form
│   │   ├── RecommendationForm.js # Get recommendations
│   │   └── PlanDisplay.js       # Display generated plans
│   ├── services/
│   │   └── travelService.js     # API service client
│   ├── styles/
│   │   ├── App.css
│   │   ├── TravelForm.css
│   │   ├── PlanDisplay.css
│   │   └── RecommendationForm.css
│   ├── App.js                   # Main app component
│   ├── index.js                 # React entry point
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── .env.example
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure API Endpoint
```bash
cp .env.example .env
# Update .env if backend is on different port
```

### 3. Start Development Server
```bash
npm start
# Opens at http://localhost:3000
```

## 📦 Dependencies

- **react** (v18.2.0) - UI library
- **react-dom** (v18.2.0) - DOM rendering
- **react-router-dom** (v6.16.0) - Routing (optional)
- **axios** (v1.6.0) - HTTP client
- **bootstrap** (v5.3.0) - CSS framework
- **react-bootstrap** (v2.8.0) - Bootstrap components
- **react-scripts** (5.0.1) - Create React App scripts

## 🎯 Pages & Components

### App.js
Main app component with:
- Navigation bar
- Tab-based navigation
- Hero section
- Footer

### TravelForm Component
Create travel plans with:
- Session initialization
- Destination & date input
- Budget & traveler count
- Interest selection
- AI itinerary generation

### RecommendationForm Component
Get destination recommendations:
- Budget slider
- Season selection
- Climate preference
- Interest filtering
- Real-time suggestions

### PlanDisplay Component
Display generated plans with:
- Trip overview
- Weather forecast
- Flight options
- Accommodation listings
- Attractions & activities
- Budget breakdown
- AI-generated itinerary

## 🔌 API Integration

Uses `travelService.js` to communicate with backend API:

```javascript
// Initialize session
travelService.initializeSession(userId, preferences);

// Get recommendations
travelService.getRecommendations(budget, season, interests, duration, climate);

// Generate plan
travelService.generateTravelPlan(sessionId, requirements);

// Get plan
travelService.getPlan(planId);

// Optimize budget
travelService.optimizeBudget(planId);

// Get updates
travelService.getTripUpdates(planId);
```

## 🎨 Styling

Uses Bootstrap 5 + custom CSS:
- Responsive grid layout
- Gradient backgrounds
- Smooth animations
- Dark theme support
- Mobile-friendly

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Build for Production

```bash
npm run build
# Creates optimized build in build/ folder
```

## 🧪 Testing

```bash
npm test
# Runs test suite (configure jest tests as needed)
```

## 🌐 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload build/ folder to Netlify
```

### Deploy to GitHub Pages
Update `package.json`:
```json
"homepage": "https://yourusername.github.io/travel-planner-frontend",
"scripts": {
  "deploy": "npm run build && gh-pages -d build"
}
```

Then:
```bash
npm install gh-pages --save-dev
npm run deploy
```

## 🔐 Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:3000/api/travel
```

Available variables:
- `REACT_APP_API_URL` - Backend API base URL

## 📊 Performance

- Code splitting with React.lazy()
- Image optimization
- CSS minification
- Bundle size < 200KB

## 🐛 Troubleshooting

### Port 3000 in use
```bash
PORT=3001 npm start
```

### API not connecting
- Ensure backend is running on port 3000
- Check `.env` REACT_APP_API_URL
- Open browser console for errors

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails
```bash
npm cache clean --force
npm install
npm run build
```

## 📚 Learn More

- [Create React App docs](https://create-react-app.dev)
- [React docs](https://react.dev)
- [Bootstrap docs](https://getbootstrap.com)
- [Axios docs](https://axios-http.com)

## 🎓 Key Learnings

- React hooks (useState, useEffect)
- Component composition
- API integration with axios
- Bootstrap integration
- CSS modules & styling
- Form handling
- State management

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - Free for personal & commercial use

---

**Version**: 1.0.0  
**Status**: ✅ Ready for Production  
**Last Updated**: June 2024
