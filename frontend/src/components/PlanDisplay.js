import React from 'react';
import { Container, Card, Row, Col, Badge, Alert } from 'react-bootstrap';
import '../styles/PlanDisplay.css';

function PlanDisplay({ plan }) {
  if (!plan || !plan.data) {
    return null;
  }

  const data = plan.data;
  const components = data.components || {};

  return (
    <Container className="plan-display mt-5 mb-5">
      <h2 className="mb-4">📋 Your Travel Plan</h2>

      {/* Basic Info */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Trip Overview</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <strong>📍 Destination:</strong> {data.requirements?.destination}
            </Col>
            <Col md={3}>
              <strong>📅 Duration:</strong> {data.requirements?.duration} days
            </Col>
            <Col md={3}>
              <strong>💰 Budget:</strong> ${data.requirements?.budget}
            </Col>
            <Col md={3}>
              <strong>👥 Travelers:</strong> {data.requirements?.travelers}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Weather */}
      {components.weather && components.weather.forecast && (
        <Card className="mb-4">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">🌤️ Weather Forecast</h5>
          </Card.Header>
          <Card.Body>
            {components.weather.forecast.slice(0, 3).map((day, idx) => (
              <div key={idx} className="weather-item mb-2">
                <strong>{new Date(day.date).toLocaleDateString()}</strong>: 
                {day.condition} - {day.temperature}°C
                <Badge bg="secondary" className="ms-2">{day.humidity}% humidity</Badge>
              </div>
            ))}
          </Card.Body>
        </Card>
      )}

      {/* Flights */}
      {components.flights && components.flights.options && (
        <Card className="mb-4">
          <Card.Header className="bg-warning text-dark">
            <h5 className="mb-0">✈️ Flight Options</h5>
          </Card.Header>
          <Card.Body>
            {components.flights.options.map((flight, idx) => (
              <div key={idx} className="flight-item mb-3 p-2 border-bottom">
                <strong>{flight.airline}</strong> {flight.flightNumber}
                <br />
                🕐 {flight.departure} → {flight.arrival} ({flight.duration})
                <br />
                {flight.stops === 0 ? <Badge bg="success">Non-stop</Badge> : <Badge bg="warning">{flight.stops} Stop(s)</Badge>}
                <Badge bg="dark" className="ms-2">${flight.price}</Badge>
              </div>
            ))}
          </Card.Body>
        </Card>
      )}

      {/* Accommodations */}
      {components.accommodations && components.accommodations.options && (
        <Card className="mb-4">
          <Card.Header className="bg-danger text-white">
            <h5 className="mb-0">🏨 Accommodation Options</h5>
          </Card.Header>
          <Card.Body>
            {components.accommodations.options.slice(0, 3).map((hotel, idx) => (
              <div key={idx} className="hotel-item mb-3 p-2 border-bottom">
                <strong>{hotel.name}</strong>
                <br />
                ⭐ {hotel.rating} ({hotel.reviews} reviews) | {hotel.type}
                <br />
                💵 ${hotel.pricePerNight}/night (Total: ${hotel.totalPrice})
                <br />
                <small>{hotel.amenities.join(', ')}</small>
              </div>
            ))}
          </Card.Body>
        </Card>
      )}

      {/* Attractions */}
      {components.attractions && components.attractions.attractions && (
        <Card className="mb-4">
          <Card.Header className="bg-success text-white">
            <h5 className="mb-0">🎭 Attractions & Activities</h5>
          </Card.Header>
          <Card.Body>
            {components.attractions.attractions.slice(0, 4).map((attraction, idx) => (
              <div key={idx} className="attraction-item mb-3 p-2 border-bottom">
                <strong>{attraction.name}</strong>
                <br />
                <Badge bg="info">{attraction.type}</Badge>
                ⭐ {attraction.rating} | 💵 {attraction.entryFee} | ⏱️ {attraction.duration}
                <br />
                <small>{attraction.description}</small>
              </div>
            ))}
          </Card.Body>
        </Card>
      )}

      {/* Budget Breakdown */}
      {components.budgetBreakdown && (
        <Card className="mb-4">
          <Card.Header className="bg-secondary text-white">
            <h5 className="mb-0">💰 Budget Breakdown</h5>
          </Card.Header>
          <Card.Body>
            {Object.entries(components.budgetBreakdown).filter(([key]) => key !== 'total' && key !== 'estimatedDaily').map(([category, data]) => {
              if (typeof data === 'object') {
                return (
                  <div key={category} className="budget-item mb-2">
                    <Row>
                      <Col md={6}><strong>{data.category}:</strong></Col>
                      <Col md={3}>${data.amount}</Col>
                      <Col md={3}><Badge>{data.percentage}%</Badge></Col>
                    </Row>
                  </div>
                );
              }
              return null;
            })}
            <hr />
            <Row className="font-weight-bold">
              <Col md={6}><h5>Total Budget:</h5></Col>
              <Col md={3}><h5>${components.budgetBreakdown.total}</h5></Col>
              <Col md={3}><h5 className="text-primary">${components.budgetBreakdown.estimatedDaily}/day</h5></Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* AI Itinerary */}
      {components.aiItinerary && (
        <Card className="mb-4">
          <Card.Header className="bg-dark text-white">
            <h5 className="mb-0">🤖 AI-Generated Itinerary</h5>
          </Card.Header>
          <Card.Body>
            <div className="itinerary-content">
              <p>{components.aiItinerary.plan}</p>
              <small className="text-muted">Generated by: {components.aiItinerary.model}</small>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default PlanDisplay;
