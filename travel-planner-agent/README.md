# Travel Planner Agent

An intelligent AI-powered travel planning assistant using IBM Granite and IBM Cloud services. This agent helps users create personalized travel plans, discover destinations, book accommodations and flights, and get real-time travel updates.

## Features

### 🎯 Core Features
- **AI-Powered Recommendations**: Get destination suggestions based on preferences, budget, and interests
- **Comprehensive Itinerary Planning**: Automatic day-by-day itinerary generation using IBM Granite
- **Real-time Weather Integration**: Get current weather forecasts for your destination
- **Flight & Accommodation Search**: Browse and compare flights and accommodations
- **Local Attractions Discovery**: Find nearby attractions, restaurants, and activities
- **Budget Optimization**: AI-driven cost-saving suggestions and budget breakdown
- **Trip Management**: Create, update, and manage multiple travel plans
- **Real-time Alerts**: Get notifications about weather changes, price drops, and important updates

### 🔧 Technical Highlights
- Built with **Node.js + Express**
- Powered by **IBM Granite** language model for intelligent planning
- Integration with **IBM Cloud Services**
- RESTful API architecture
- Comprehensive error handling and validation
- Modular service-based design
- Real-time data integration from multiple sources

## Architecture

```
travel-planner-agent/
├── src/
│   ├── agents/
│   │   └── travelPlannerAgent.js      # Main agent orchestrator
│   ├── services/
│   │   ├── graniteService.js          # IBM Granite integration
│   │   └── travelDataService.js       # External API integrations
│   ├── routes/
│   │   └── travelRoutes.js            # API endpoints
│   ├── config/
│   │   ├── logger.js                  # Logging configuration
│   │   └── ibmCloud.js                # IBM Cloud setup
│   ├── utils/
│   │   └── travelUtils.js             # Helper functions
│   └── index.js                       # Express app entry point
├── package.json
├── .env.example
├── API_DOCUMENTATION.md
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- IBM Cloud Account (Lite tier available)
- API keys for:
  - IBM Cloud
  - Watsonx (for Granite models)
  - OpenWeather (optional)
  - Google Maps (optional)

### Installation

1. **Clone/Create the project**
```bash
cd travel-planner-agent
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your IBM Cloud API keys and service credentials
```

4. **Start the server**
```bash
npm run dev    # Development with hot reload
npm start      # Production
```

The server will start on `http://localhost:3000`

## API Usage

### Initialize a Session
```bash
curl -X POST http://localhost:3000/api/travel/session \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "preferences": { "currency": "USD", "language": "en" }
  }'
```

### Generate a Travel Plan
```bash
curl -X POST http://localhost:3000/api/travel/plans \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "your-session-id",
    "requirements": {
      "destination": "Paris",
      "origin": "New York",
      "destinationAirport": "CDG",
      "startDate": "2024-06-15",
      "endDate": "2024-06-22",
      "duration": 7,
      "budget": 3000,
      "travelers": 2,
      "interests": ["history", "culture", "cuisine"]
    }
  }'
```

### Get Destination Recommendations
```bash
curl -X POST http://localhost:3000/api/travel/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 2500,
    "season": "summer",
    "interests": ["beaches", "adventure"],
    "duration": 7,
    "climate": "warm"
  }'
```

### Get Real-time Trip Updates
```bash
curl -X GET http://localhost:3000/api/travel/plans/plan-id/updates
```

For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## IBM Cloud Setup

### 1. Create IBM Cloud Account
- Visit [IBM Cloud](https://cloud.ibm.com)
- Sign up for a free Lite account

### 2. Get API Key
```bash
ibmcloud login
ibmcloud iam api-key-create my-key
```

### 3. Create Watsonx Project
- Go to Watsonx in your IBM Cloud console
- Create a new project
- Get your Project ID

### 4. Set Environment Variables
```bash
export IBM_CLOUD_API_KEY="your-api-key"
export WATSONX_PROJECT_ID="your-project-id"
```

## Integration with IBM Granite

The agent uses **IBM Granite-13b-chat** model for:
- **Travel Plan Generation**: Creates detailed day-by-day itineraries
- **Destination Recommendations**: AI-powered suggestions based on preferences
- **Budget Optimization**: Identifies cost-saving opportunities
- **Activity Planning**: Suggests activities based on interests and schedule

### Example Granite Interactions:
```javascript
// Generate itinerary
const plan = await graniteService.generateTravelPlan({
  destination: "Tokyo",
  duration: 7,
  budget: 4000,
  interests: ["technology", "culture"],
  // ...
});

// Get recommendations
const recommendations = await graniteService.getDestinationRecommendations({
  budget: 3000,
  season: "summer",
  interests: ["beaches", "food"],
  // ...
});
```

## External Service Integrations

### Weather (OpenWeatherMap)
- Real-time forecasts
- Historical weather data
- Weather alerts

### Transportation (Amadeus)
- Flight search and pricing
- Real-time flight tracking
- Seat availability

### Accommodation (Booking.com, Airbnb)
- Property search
- Price comparison
- Booking integration (placeholder)

### Maps (Google Maps)
- Route planning
- Distance calculations
- POI discovery

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/session` | Initialize planning session |
| POST | `/plans` | Generate travel plan |
| GET | `/plans/:planId` | Get plan details |
| GET | `/user/:userId/plans` | Get user's plans |
| POST | `/recommendations` | Get destination recommendations |
| POST | `/plans/:planId/optimize` | Optimize trip budget |
| GET | `/plans/:planId/updates` | Get real-time updates |
| PUT | `/plans/:planId` | Update plan |
| DELETE | `/plans/:planId` | Delete plan |

## Development

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

### Check Logs
```bash
# View recent logs
tail -f combined.log

# View error logs
tail -f error.log
```

## Project Structure & Modules

### `graniteService.js`
- Granite LLM integration
- Travel plan generation
- AI recommendations
- Budget optimization

### `travelDataService.js`
- External API aggregation
- Weather forecasts
- Flight searches
- Accommodation options
- Local attractions

### `travelPlannerAgent.js`
- Main orchestrator
- Session management
- Plan generation workflow
- Budget calculations

### `travelRoutes.js`
- RESTful API endpoints
- Input validation
- Error handling

### `travelUtils.js`
- Helper functions
- Calculations (distance, budget, etc.)
- Data formatting

## Error Handling

The API includes comprehensive error handling:
- Request validation with detailed error messages
- Try-catch blocks for all async operations
- Structured error responses
- Detailed logging for debugging

## Future Enhancements

- [ ] User authentication (JWT)
- [ ] Database persistence (MongoDB)
- [ ] Caching layer (Redis)
- [ ] Real booking integration
- [ ] Push notifications
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Group trip planning
- [ ] Travel insurance integration

## Performance Optimization

Current optimizations:
- Token caching for IBM Cloud auth
- Parallel API requests
- Error recovery mechanisms
- Modular service design

Planned:
- Response caching
- Database indexing
- Load balancing
- Rate limiting

## Security Considerations

- API keys stored in environment variables
- Input validation on all endpoints
- CORS enabled for cross-origin requests
- Error messages don't expose sensitive data
- Structured logging without credentials

## Testing

Example test scenarios:
```bash
# Test health endpoint
curl http://localhost:3000/health

# Test session creation
curl -X POST http://localhost:3000/api/travel/session \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","preferences":{}}'

# Test plan retrieval
curl http://localhost:3000/api/travel/plans/invalid-id
```

## Troubleshooting

### IBM Granite Connection Issues
- Verify IBM_CLOUD_API_KEY is set correctly
- Check Watsonx project ID
- Ensure IBM Cloud account has active services

### Weather API Not Working
- Confirm OPENWEATHER_API_KEY is valid
- Check API rate limits
- Verify internet connectivity

### Memory Leaks
- Check logs for "Plan storage growing" warnings
- Implement plan cleanup for completed/archived trips
- Monitor node process memory usage

## Contributing

Guidelines for contributors:
1. Follow existing code style
2. Add tests for new features
3. Update documentation
4. Submit pull requests with clear descriptions

## License

MIT License - See LICENSE file

## Support

For issues, questions, or suggestions:
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Review logs in `error.log` and `combined.log`
- Check IBM Cloud documentation
- Review code comments and inline documentation

## Acknowledgments

- IBM Granite team
- IBM Cloud services
- OpenWeatherMap API
- Travel data providers

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Status**: Active Development
