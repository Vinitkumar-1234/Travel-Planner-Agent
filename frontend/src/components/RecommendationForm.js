import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card, Spinner } from 'react-bootstrap';
import travelService from '../services/travelService';
import '../styles/RecommendationForm.css';

function RecommendationForm({ onRecommendationsReceived }) {
  const [formData, setFormData] = useState({
    budget: 2500,
    season: 'summer',
    interests: ['beaches'],
    duration: 7,
    climate: 'warm'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' || name === 'duration' ? parseInt(value) : value
    }));
  };

  const handleInterestsChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const getRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await travelService.getRecommendations(
        formData.budget,
        formData.season,
        formData.interests,
        formData.duration,
        formData.climate
      );
      setRecommendations(response.data);
      if (onRecommendationsReceived) onRecommendationsReceived(response.data);
    } catch (err) {
      setError('Failed to get recommendations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const interests = ['beaches', 'culture', 'adventure', 'food', 'shopping', 'nature', 'history', 'nightlife'];
  const climates = ['hot', 'warm', 'mild', 'cool', 'cold'];

  return (
    <Container className="recommendation-form mt-5">
      <h2 className="mb-4">🌍 Get Destination Recommendations</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col lg={5}>
          <Card className="p-4 sticky-top" style={{ top: '20px' }}>
            <h5 className="mb-4">Filter Your Preferences</h5>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Budget (USD)</Form.Label>
                <Form.Range
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  min="1000"
                  max="10000"
                  step="500"
                />
                <small className="text-muted">Selected: ${formData.budget}</small>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Duration (Days)</Form.Label>
                <Form.Range
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="3"
                  max="30"
                  step="1"
                />
                <small className="text-muted">Selected: {formData.duration} days</small>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Season</Form.Label>
                <Form.Select
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                >
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Climate Preference</Form.Label>
                <Form.Select
                  name="climate"
                  value={formData.climate}
                  onChange={handleInputChange}
                >
                  {climates.map(climate => (
                    <option key={climate} value={climate}>{climate}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Interests</Form.Label>
                {interests.map(interest => (
                  <Form.Check
                    key={interest}
                    type="checkbox"
                    label={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestsChange(interest)}
                  />
                ))}
              </Form.Group>

              <Button
                onClick={getRecommendations}
                disabled={loading}
                variant="primary"
                className="w-100"
                size="lg"
              >
                {loading ? <><Spinner size="sm" /> Loading...</> : '🔍 Get Recommendations'}
              </Button>
            </Form>
          </Card>
        </Col>

        <Col lg={7}>
          {recommendations && (
            <Card className="p-4">
              <h5 className="mb-3">✨ Recommendations for You</h5>
              <div className="recommendations-content">
                <p>{recommendations.recommendations}</p>
              </div>
            </Card>
          )}

          {!recommendations && !loading && (
            <Alert variant="info">
              👈 Fill your preferences and click "Get Recommendations" to see personalized destination suggestions powered by AI!
            </Alert>
          )}

          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-3">Getting personalized recommendations...</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default RecommendationForm;
