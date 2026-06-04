# Sample API Requests for Travel Planner Agent

## 1. Initialize Session

### Request
```bash
curl -X POST http://localhost:3000/api/travel/session \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-john-123",
    "preferences": {
      "currency": "USD",
      "language": "en",
      "pace": "moderate",
      "accessibility": {
        "wheelchair": false,
        "visual_impairment": false,
        "hearing_impairment": false
      }
    }
  }'
```

### Response
```json
{
  "success": true,
  "message": "Session initialized",
  "data": {
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "user-john-123",
    "preferences": {
      "currency": "USD",
      "language": "en",
      "pace": "moderate"
    }
  }
}
```

---

## 2. Get Destination Recommendations

### Request
```bash
curl -X POST http://localhost:3000/api/travel/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 3000,
    "season": "summer",
    "interests": ["beaches", "culture", "adventure"],
    "duration": 7,
    "climate": "warm",
    "travelers": 2
  }'
```

### Response
```json
{
  "success": true,
  "data": {
    "recommendations": "Based on your preferences for warm weather, culture, and adventure within a $3000 budget for 7 days...",
    "destinations": [
      {
        "name": "Barcelona, Spain",
        "why_matches": "Perfect combination of beaches, cultural sites, and vibrant nightlife",
        "estimated_cost": 2500,
        "best_time": "June-September",
        "top_attractions": ["Sagrada Familia", "Park Güell", "Las Ramblas"]
      }
    ]
  }
}
```

---

## 3. Generate Comprehensive Travel Plan

### Request
```bash
curl -X POST http://localhost:3000/api/travel/plans \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "requirements": {
      "destination": "Barcelona",
      "origin": "New York",
      "destinationAirport": "BCN",
      "startDate": "2024-07-15",
      "endDate": "2024-07-22",
      "duration": 7,
      "budget": 3500,
      "travelers": 2,
      "interests": ["culture", "food", "architecture", "beaches"]
    }
  }'
```

### Response
```json
{
  "success": true,
  "message": "Travel plan generated successfully",
  "data": {
    "id": "plan-550e8400-e29b-41d4",
    "sessionId": "session-550e8400-e29b-41d4",
    "createdAt": "2024-06-01T10:30:00Z",
    "status": "completed",
    "requirements": {
      "destination": "Barcelona",
      "duration": 7,
      "budget": 3500,
      "travelers": 2
    },
    "components": {
      "weather": {
        "destination": "Barcelona",
        "forecast": [
          {
            "date": "2024-07-15T00:00:00.000Z",
            "temperature": 28,
            "condition": "Sunny",
            "humidity": 65,
            "windSpeed": 12,
            "description": "Clear sky with high temperature"
          }
        ]
      },
      "flights": {
        "origin": "New York",
        "destination": "Barcelona",
        "options": [
          {
            "flightNumber": "AA123",
            "airline": "American Airlines",
            "departure": "08:00",
            "arrival": "16:30",
            "duration": "8h 30m",
            "stops": 0,
            "price": 450,
            "currency": "USD"
          },
          {
            "flightNumber": "UA456",
            "airline": "United Airlines",
            "departure": "10:15",
            "arrival": "18:45",
            "duration": "8h 30m",
            "stops": 0,
            "price": 480,
            "currency": "USD"
          }
        ]
      },
      "accommodations": {
        "destination": "Barcelona",
        "checkIn": "2024-07-15",
        "checkOut": "2024-07-22",
        "nights": 7,
        "guests": 2,
        "options": [
          {
            "id": "hotel1",
            "name": "Luxury Plaza Barcelona",
            "type": "Hotel",
            "rating": 4.8,
            "reviews": 1250,
            "pricePerNight": 150,
            "totalPrice": 1050,
            "amenities": ["WiFi", "Swimming Pool", "Gym", "Restaurant", "Spa"],
            "address": "Gothic Quarter"
          },
          {
            "id": "apt1",
            "name": "Modern City Apartment",
            "type": "Apartment",
            "rating": 4.6,
            "reviews": 580,
            "pricePerNight": 85,
            "totalPrice": 595,
            "amenities": ["WiFi", "Kitchen", "Washer", "Air Conditioning"],
            "address": "Eixample District"
          }
        ]
      },
      "attractions": {
        "destination": "Barcelona",
        "attractions": [
          {
            "name": "Sagrada Familia",
            "type": "Religious Site",
            "rating": 4.8,
            "reviews": 15000,
            "description": "Gaudí's masterpiece basilica under construction",
            "openingHours": "09:00-21:00",
            "entryFee": "$30",
            "duration": "2-3 hours",
            "distanceFromCenter": "3.2 km"
          },
          {
            "name": "Park Güell",
            "type": "Park",
            "rating": 4.7,
            "reviews": 12000,
            "description": "Gaudí-designed public park with unique architecture",
            "openingHours": "08:00-20:00",
            "entryFee": "$15",
            "duration": "2-3 hours",
            "distanceFromCenter": "5.5 km"
          },
          {
            "name": "Gothic Quarter",
            "type": "Historical Area",
            "rating": 4.6,
            "reviews": 8500,
            "description": "Medieval area with narrow streets and historic buildings",
            "openingHours": "24/7",
            "entryFee": "Free",
            "duration": "2-3 hours",
            "distanceFromCenter": "0.5 km"
          }
        ]
      },
      "aiItinerary": {
        "success": true,
        "plan": "Day 1: Arrive and explore Gothic Quarter...\nDay 2: Visit Sagrada Familia and Park Güell...\nDay 3-7: Various activities including beaches, museums, food tours...",
        "model": "ibm/granite-13b-chat-v2"
      },
      "budgetBreakdown": {
        "flights": {
          "category": "Transportation",
          "amount": 900,
          "percentage": "25.7"
        },
        "accommodation": {
          "category": "Stay",
          "amount": 595,
          "percentage": "17.0"
        },
        "meals": {
          "category": "Dining",
          "amount": 420,
          "percentage": "12.0"
        },
        "activities": {
          "category": "Entertainment",
          "amount": 350,
          "percentage": "10.0"
        },
        "transportation": {
          "category": "Local Transport",
          "amount": 140,
          "percentage": "4.0"
        },
        "contingency": {
          "category": "Emergency Fund",
          "amount": 100,
          "percentage": "2.9"
        },
        "total": 3500,
        "estimatedDaily": "500.00"
      }
    }
  }
}
```

---

## 4. Get Specific Plan Details

### Request
```bash
curl -X GET http://localhost:3000/api/travel/plans/plan-550e8400-e29b-41d4
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "plan-550e8400-e29b-41d4",
    "sessionId": "session-550e8400-e29b-41d4",
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

## 5. Optimize Trip Budget

### Request
```bash
curl -X POST http://localhost:3000/api/travel/plans/plan-550e8400-e29b-41d4/optimize \
  -H "Content-Type: application/json"
```

### Response
```json
{
  "success": true,
  "message": "Budget optimization suggestions generated",
  "data": {
    "optimizations": "Consider staying in Airbnb apartments in the Eixample district to save ~$20-30/night...",
    "estimatedSavings": "calculated based on suggestions"
  }
}
```

---

## 6. Get Real-time Trip Updates

### Request
```bash
curl -X GET http://localhost:3000/api/travel/plans/plan-550e8400-e29b-41d4/updates
```

### Response
```json
{
  "success": true,
  "data": {
    "planId": "plan-550e8400-e29b-41d4",
    "timestamp": "2024-06-01T12:00:00Z",
    "updates": [
      {
        "type": "weather",
        "message": "Current conditions in Barcelona: Sunny, 28°C with 12 km/h wind",
        "data": {
          "date": "2024-06-01T12:00:00Z",
          "temperature": 28,
          "condition": "Sunny",
          "humidity": 65,
          "windSpeed": 12
        }
      }
    ]
  }
}
```

---

## 7. Get User's Travel Plans

### Request
```bash
curl -X GET http://localhost:3000/api/travel/user/user-john-123/plans
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "plan-550e8400-e29b-41d4",
      "sessionId": "session-550e8400-e29b-41d4",
      "createdAt": "2024-06-01T10:30:00Z",
      "status": "completed",
      "components": { ... }
    },
    {
      "id": "plan-660e8400-e29b-41d4",
      "sessionId": "session-660e8400-e29b-41d4",
      "createdAt": "2024-05-15T09:15:00Z",
      "status": "completed",
      "components": { ... }
    }
  ],
  "count": 2
}
```

---

## 8. Update a Travel Plan

### Request
```bash
curl -X PUT http://localhost:3000/api/travel/plans/plan-550e8400-e29b-41d4 \
  -H "Content-Type: application/json" \
  -d '{
    "updates": {
      "budget": 4000,
      "travelers": 3,
      "interests": ["culture", "food", "architecture", "beaches", "nightlife"]
    }
  }'
```

### Response
```json
{
  "success": true,
  "message": "Plan updated successfully",
  "data": {
    "id": "plan-550e8400-e29b-41d4",
    "requirements": {
      "budget": 4000,
      "travelers": 3,
      "interests": ["culture", "food", "architecture", "beaches", "nightlife"]
    },
    "components": { ... }
  }
}
```

---

## 9. Delete a Travel Plan

### Request
```bash
curl -X DELETE http://localhost:3000/api/travel/plans/plan-550e8400-e29b-41d4
```

### Response
```json
{
  "success": true,
  "message": "Plan deleted successfully"
}
```

---

## Error Response Examples

### Missing Required Field
```json
{
  "success": false,
  "error": "Destination is required"
}
```

### Invalid Budget
```json
{
  "success": false,
  "error": "Budget must be a number"
}
```

### Plan Not Found
```json
{
  "success": false,
  "error": "Plan not found: plan-invalid-id"
}
```

---

## Testing with Postman

1. Import these requests into Postman
2. Create environment variables:
   - `base_url`: `http://localhost:3000/api/travel`
   - `sessionId`: (from session creation)
   - `planId`: (from plan generation)
   - `userId`: `user-john-123`

3. Run requests in order for complete workflow testing
