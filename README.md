# ✈️ Travel Planner Agent

> An AI-powered travel planning assistant that helps users plan trips efficiently and intelligently using IBM Granite LLM and real-time travel data.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

### 🤖 AI-Powered Planning
- **IBM Granite LLM Integration** - Generate custom travel itineraries
- **Smart Recommendations** - Get personalized destination suggestions
- **Budget Optimization** - AI-powered cost-saving strategies
- **Real-time Analysis** - Process user preferences intelligently

### 🎯 Travel Planning
- **Comprehensive Itineraries** - Day-by-day travel plans
- **Flight Information** - Flight options and schedules
- **Hotel Recommendations** - Accommodation suggestions with ratings
- **Local Attractions** - Points of interest and activities
- **Weather Forecasts** - Real-time weather data
- **Budget Breakdown** - Detailed cost analysis by category

### 🎨 Beautiful UI
- **Modern React Interface** - Clean and intuitive design
- **Responsive Bootstrap** - Works on all devices
- **Smooth Animations** - Professional user experience
- **Real-time Updates** - Live data visualization

### 📱 Full-Stack Architecture
- **Separate Frontend & Backend** - Easy to understand and maintain
- **REST API** - 9 well-documented endpoints
- **Production-Ready Code** - Error handling, logging, validation
- **Environment-Based Config** - Secure credential management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm 7 or higher
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Vinitkumar-1234/Travel-Planner-Agent.git
cd Travel-Planner-Agent
```

2. **Setup Backend**
```bash
cd travel-planner-agent

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Add your IBM Cloud credentials to .env:
# IBM_CLOUD_API_KEY=your_api_key
# WATSONX_PROJECT_ID=your_project_id

# Start backend server
npm run dev
# Backend runs on http://localhost:3001
```

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start frontend
npm start
# Frontend opens at http://localhost:3000
```

### Access the Application
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs**: See [API_DOCUMENTATION.md](travel-planner-agent/API_DOCUMENTATION.md)

---

## 📋 Project Structure

```
Travel-Planner-Agent/
├── travel-planner-agent/          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── agents/               # AI orchestration
│   │   ├── services/             # IBM Granite & data services
│   │   ├── routes/               # REST endpoints
│   │   ├── config/               # Configuration & auth
│   │   ├── utils/                # Helper functions
│   │   └── index.js              # Server entry point
│   ├── API_DOCUMENTATION.md      # All 9 endpoints
│   ├── SAMPLE_REQUESTS.md        # Working examples
│   ├── DEPLOYMENT_GUIDE.md       # IBM Cloud deployment
│   └── package.json
│
├── frontend/                      # Frontend (React + Bootstrap)
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── services/             # API client
│   │   ├── styles/               # CSS styling
│   │   ├── App.js                # Main component
│   │   └── index.js              # React entry
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── HOW_TO_RUN.md                 # Detailed setup guide
├── PROJECT_OVERVIEW.md           # Architecture overview
├── QUICK_START.md                # 3-step quick start
├── README.md                     # This file
└── .gitignore
```

---

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 16+ | JavaScript runtime |
| **Express.js** | 4.18.2 | Web framework |
| **IBM Granite** | LLM | AI model for itinerary generation |
| **IBM Cloud SDK** | 4.1.2 | Cloud authentication |
| **Axios** | 1.6.0 | HTTP client |
| **Winston** | 3.11.0 | Logging system |
| **Joi** | 17.11.0 | Input validation |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | UI library |
| **Bootstrap** | 5.3.0 | CSS framework |
| **React Bootstrap** | 2.8.0 | Component library |
| **Axios** | 1.6.0 | HTTP client |
| **CSS3** | - | Styling & animations |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **IBM Cloud** | Cloud hosting & AI services |
| **Watsonx** | AI/ML platform |
| **REST APIs** | Communication protocol |

---

## 📚 API Endpoints

The backend provides 9 REST endpoints:

```
POST   /api/travel/session              Initialize planning session
POST   /api/travel/plans                Generate comprehensive travel plan
GET    /api/travel/plans/:id            Get specific plan
PUT    /api/travel/plans/:id            Update plan
DELETE /api/travel/plans/:id            Delete plan
GET    /api/travel/user/:id/plans       List user's plans
POST   /api/travel/recommendations      Get AI recommendations
POST   /api/travel/plans/:id/optimize   Optimize trip budget
GET    /api/travel/plans/:id/updates    Get real-time updates
```

For detailed endpoint documentation, see [API_DOCUMENTATION.md](travel-planner-agent/API_DOCUMENTATION.md).

---

## 💻 Usage Examples

### Create a Travel Plan
```bash
curl -X POST http://localhost:3001/api/travel/plans \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session-123",
    "destination": "Paris",
    "startDate": "2024-07-01",
    "endDate": "2024-07-07",
    "budget": 3000,
    "travelers": 2,
    "interests": ["culture", "food", "history"]
  }'
```

### Get AI Recommendations
```bash
curl -X POST http://localhost:3001/api/travel/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 2500,
    "season": "summer",
    "interests": ["beaches", "adventure"],
    "duration": 7,
    "climate": "warm"
  }'
```

For more examples, see [SAMPLE_REQUESTS.md](travel-planner-agent/SAMPLE_REQUESTS.md).

---

## 🎯 Key Features Explained

### AI Itinerary Generation
The system uses IBM Granite LLM to:
- Understand user preferences
- Generate custom day-by-day itineraries
- Suggest activities based on interests
- Optimize travel routes
- Recommend restaurants and attractions

### Real-Time Data Integration
The backend aggregates data from:
- **Weather APIs** - Current forecasts and conditions
- **Flight Data** - Available flights and prices
- **Hotels** - Accommodation options and ratings
- **Attractions** - Points of interest and hours
- **Maps** - Routes and distances

### Smart Budget Planning
- Calculates daily budgets
- Breaks down costs by category
- Suggests cost-saving opportunities
- Estimates emissions for eco-conscious travelers

---

## 📖 Documentation

Complete documentation is available:

1. **Getting Started**
   - [HOW_TO_RUN.md](HOW_TO_RUN.md) - Complete setup guide
   - [QUICK_START.md](QUICK_START.md) - 3-step quick start

2. **Development**
   - [Backend README](travel-planner-agent/README.md)
   - [Frontend README](frontend/README.md)
   - [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Architecture details

3. **API Reference**
   - [API_DOCUMENTATION.md](travel-planner-agent/API_DOCUMENTATION.md) - All endpoints
   - [SAMPLE_REQUESTS.md](travel-planner-agent/SAMPLE_REQUESTS.md) - Working examples

4. **Deployment**
   - [DEPLOYMENT_GUIDE.md](travel-planner-agent/DEPLOYMENT_GUIDE.md) - Deploy to IBM Cloud

---

## 🔐 Environment Configuration

### Backend (.env)
```bash
# IBM Cloud Credentials
IBM_CLOUD_API_KEY=your_api_key
WATSONX_PROJECT_ID=your_project_id

# Server Configuration
PORT=3001
NODE_ENV=development
LOG_LEVEL=info

# External APIs
OPENWEATHER_API_KEY=your_key
AMADEUS_API_KEY=your_key
```

### Frontend (.env)
```bash
# Backend API
REACT_APP_API_URL=http://localhost:3001/api/travel
```

---

## 🚀 Deployment

### Deploy Backend to IBM Cloud
```bash
cd travel-planner-agent
ibm-dev run
```

See [DEPLOYMENT_GUIDE.md](travel-planner-agent/DEPLOYMENT_GUIDE.md) for detailed instructions.

### Deploy Frontend
- **Vercel**: `vercel` (recommended)
- **Netlify**: Upload `build/` folder
- **GitHub Pages**: `npm run deploy`

---

## 🧪 Testing

### Test Backend Health
```bash
curl http://localhost:3001/health
# Should return: {"status":"healthy",...}
```

### Test Frontend
1. Open http://localhost:3000
2. Fill in travel details
3. Click "Generate Plan"
4. See results!

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Total Files** | 44 |
| **Lines of Code** | 34,923+ |
| **React Components** | 3 |
| **API Endpoints** | 9 |
| **Documentation** | 8+ files |
| **Test Coverage** | Basic (add more) |

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit (`git commit -m 'Add AmazingFeature'`)
5. Push to branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Areas for Contribution
- [ ] Add unit tests
- [ ] Improve UI design
- [ ] Add more travel data APIs
- [ ] Implement user authentication
- [ ] Add database integration
- [ ] Deploy and test at scale
- [ ] Improve documentation
- [ ] Create mobile app

---

## 🐛 Known Issues & Limitations

- Mock data used for flights, hotels, attractions (ready for real API integration)
- In-memory storage (add database for persistence)
- No user authentication (add JWT for production)
- No rate limiting (add for production scale)
- Frontend requires backend running on localhost:3001

---

## 🛣️ Roadmap

### Version 1.1 (Q3 2024)
- [ ] User authentication with JWT
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Advanced filtering and search
- [ ] User profile management
- [ ] Saved trips functionality

### Version 1.2 (Q4 2024)
- [ ] Mobile app (React Native)
- [ ] Real API integrations (flights, hotels)
- [ ] Advanced AI features
- [ ] Multi-language support
- [ ] Payment integration

### Version 2.0 (2025)
- [ ] Social features (share plans)
- [ ] Group planning
- [ ] Collaborative editing
- [ ] Mobile-first redesign
- [ ] Web3 integration

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/Vinitkumar-1234/Travel-Planner-Agent/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Vinitkumar-1234/Travel-Planner-Agent/discussions)
- **Email**: vinitkumar@example.com
- **Documentation**: See docs folder

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ⚠️ Must include license & copyright notice

---

## ⭐ Acknowledgments

- **IBM Cloud** - For excellent AI/ML services
- **IBM Granite** - For the powerful LLM
- **React Team** - For amazing frontend framework
- **Bootstrap** - For beautiful CSS framework
- **Express.js** - For robust backend framework

---

## 📈 Project Activity

![GitHub last commit](https://img.shields.io/github/last-commit/Vinitkumar-1234/Travel-Planner-Agent)
![GitHub repo size](https://img.shields.io/github/repo-size/Vinitkumar-1234/Travel-Planner-Agent)
![GitHub issues](https://img.shields.io/github/issues/Vinitkumar-1234/Travel-Planner-Agent)
![GitHub stars](https://img.shields.io/github/stars/Vinitkumar-1234/Travel-Planner-Agent?style=social)

---

## 🎯 Quick Navigation

| What? | Where? |
|-------|--------|
| **Setup** | [HOW_TO_RUN.md](HOW_TO_RUN.md) |
| **Quick Start** | [QUICK_START.md](QUICK_START.md) |
| **Architecture** | [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) |
| **API Docs** | [API_DOCUMENTATION.md](travel-planner-agent/API_DOCUMENTATION.md) |
| **Examples** | [SAMPLE_REQUESTS.md](travel-planner-agent/SAMPLE_REQUESTS.md) |
| **Deploy** | [DEPLOYMENT_GUIDE.md](travel-planner-agent/DEPLOYMENT_GUIDE.md) |
| **Backend** | [travel-planner-agent/README.md](travel-planner-agent/README.md) |
| **Frontend** | [frontend/README.md](frontend/README.md) |

---

## 🌟 Star the Repo!

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | June 2024 | Initial release with full features |

---

<div align="center">

### Made with ❤️ for travel enthusiasts

[⬆ back to top](#-travel-planner-agent)

</div>
