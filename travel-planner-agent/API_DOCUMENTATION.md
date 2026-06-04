# Travel Planner Agent API - Documentation

## Overview
Travel Planner Agent is an intelligent travel planning assistant powered by IBM Granite and IBM Cloud services. It helps users create personalized travel plans based on their preferences, budget, and constraints.

## Base URL
```
http://localhost:3000/api/travel
```

## Authentication
Currently, the API uses no authentication. In production, implement JWT or OAuth 2.0.

---

## Endpoints

### 1. Initialize Session
**POST** `/session`

Initialize a new travel planning session.

**Request Body:**
```json
{
  "userId": "user123",
  "preferences": {
    "currency": "USD",
    "language": "en",
    "pace": "moderate"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Session initialized",
  "data": {
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "user123",
    "preferences": { ... }
  }
}
```

---

### 2. Generate Travel Plan
**POST** `/plans`

Generate a comprehensive travel plan based on user requirements.

**Request Body:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
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
}
```

**Response:**
```json
{
  "success": true,
  "message": "Travel plan generated successfully",
  "data": {
    "id": "plan-uuid",
    "sessionId": "session-uuid",
    "createdAt": "2024-06-01T10:30:00Z",
    "status": "completed",
    "components": {
      "weather": { ... },
      "flights": { ... },
      "accommodations": { ... },
      "attractions": { ... },
      "aiItinerary": { ... },
      "budgetBreakdown": { ... }
    }
  }
}
```

---

### 3. Get Travel Plan
**GET** `/plans/:planId`

Retrieve details of a specific travel plan.

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 4. Get User's Plans
**GET** `/user/:userId/plans`

Retrieve all travel plans created by a specific user.

**Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "count": 3
}
```

---

### 5. Get Destination Recommendations
**POST** `/recommendations`

Get AI-powered destination recommendations based on preferences.

**Request Body:**
```json
{
  "budget": 2500,
  "season": "summer",
  "interests": ["beaches", "adventure", "food"],
  "duration": 7,
  "climate": "warm"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": "..."
  }
}
```

---

### 6. Optimize Trip Budget
**POST** `/plans/:planId/optimize`

Get cost-saving suggestions for an existing travel plan.

**Response:**
```json
{
  "success": true,
  "message": "Budget optimization suggestions generated",
  "data": {
    "optimizations": "...",
    "estimatedSavings": "..."
  }
}
```

---

### 7. Get Trip Updates
**GET** `/plans/:planId/updates`

Get real-time updates for a trip (weather, alerts, etc.).

**Response:**
```json
{
  "success": true,
  "data": {
    "planId": "plan-uuid",
    "timestamp": "2024-06-01T12:00:00Z",
    "updates": [
      {
        "type": "weather",
        "message": "...",
        "data": { ... }
      }
    ]
  }
}
```

---

### 8. Update Travel Plan
**PUT** `/plans/:planId`

Update an existing travel plan.

**Request Body:**
```json
{
  "updates": {
    "budget": 3500,
    "travelers": 3
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Plan updated successfully",
  "data": { ... }
}
```

---

### 9. Delete Travel Plan
**DELETE** `/plans/:planId`

Delete a travel plan.

**Response:**
```json
{
  "success": true,
  "message": "Plan deleted successfully"
}
```

---

## Error Handling

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message"
}
```

### Common HTTP Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## Example Usage

### Complete Travel Planning Flow:

#### 1. Initialize Session
```bash
curl -X POST http://localhost:3000/api/travel/session \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "preferences": { "currency": "USD" }
  }'
```

#### 2. Generate Plan
```bash
curl -X POST http://localhost:3000/api/travel/plans \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session-id",
    "requirements": {
      "destination": "Tokyo",
      "origin": "NYC",
      "destinationAirport": "HND",
      "startDate": "2024-07-01",
      "endDate": "2024-07-08",
      "duration": 7,
      "budget": 4000,
      "travelers": 2,
      "interests": ["technology", "culture", "food"]
    }
  }'
```

#### 3. Get Recommendations
```bash
curl -X POST http://localhost:3000/api/travel/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 3000,
    "season": "summer",
    "interests": ["beaches", "culture"],
    "duration": 7,
    "climate": "warm"
  }'
```

---

## Features

### Core Capabilities:
- ✅ AI-powered destination recommendations
- ✅ Comprehensive itinerary generation using IBM Granite
- ✅ Real-time weather forecasts
- ✅ Flight and accommodation search
- ✅ Local attractions and POI discovery
- ✅ Budget planning and optimization
- ✅ Cost breakdown analysis
- ✅ Trip update notifications
- ✅ Multi-traveler support

### Integrated Services:
- IBM Granite (Language Model)
- IBM Watson Assistant (optional)
- OpenWeather API
- Google Maps API (placeholder)
- Amadeus Travel API (placeholder)
- Booking.com/Airbnb Integration (placeholder)

---

## Environment Variables

See `.env.example` for all required environment variables:
- `IBM_CLOUD_API_KEY` - IBM Cloud authentication
- `WATSONX_PROJECT_ID` - Watsonx project identifier
- `OPENWEATHER_API_KEY` - Weather data
- `GOOGLE_MAPS_API_KEY` - Maps functionality
- `AMADEUS_CLIENT_ID` & `AMADEUS_CLIENT_SECRET` - Flight data

---

## Rate Limiting

Not implemented in current version. Add in production.

---

## Data Models

### Travel Plan
```javascript
{
  id: string,
  sessionId: string,
  createdAt: ISO8601,
  status: "generating" | "completed" | "archived",
  requirements: Object,
  components: {
    weather: Object,
    flights: Array,
    accommodations: Array,
    attractions: Array,
    aiItinerary: String,
    budgetBreakdown: Object
  }
}
```

### Accommodation
```javascript
{
  id: string,
  name: string,
  type: string,
  rating: number,
  reviews: number,
  pricePerNight: number,
  amenities: string[],
  address: string
}
```

### Attraction
```javascript
{
  name: string,
  type: string,
  rating: number,
  description: string,
  openingHours: string,
  entryFee: string,
  duration: string,
  distanceFromCenter: string
}
```

---

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

---

## Support & Documentation
For issues or questions, please refer to the project README.
