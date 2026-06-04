import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import travelService from '../services/travelService';
import '../styles/TravelForm.css';

function TravelForm({ onPlanCreated, onSessionCreated }) {
  const [formData, setFormData] = useState({
    userId: 'user-' + Math.random().toString(36).substr(2, 9),
    destination: '',
    origin: 'New York',
    destinationAirport: '',
    startDate: '',
    endDate: '',
    budget: 3000,
    travelers: 1,
    interests: ['culture'],
    season: 'summer'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' || name === 'travelers' ? parseInt(value) : value
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

  const initializeSession = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await travelService.initializeSession(formData.userId, {
        currency: 'USD',
        language: 'en'
      });
      setSessionId(response.data.sessionId);
      setSuccess(`Session created! ID: ${response.data.sessionId.slice(0, 8)}...`);
      if (onSessionCreated) onSessionCreated(response.data);
    } catch (err) {
      setError('Failed to create session: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const generatePlan = async () => {
    if (!sessionId) {
      setError('Please create session first');
      return;
    }

    if (!formData.destination || !formData.startDate || !formData.endDate) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const duration = Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24));

      const response = await travelService.generateTravelPlan(sessionId, {
        ...formData,
        duration
      });

      setSuccess('Travel plan created successfully!');
      if (onPlanCreated) onPlanCreated(response.data);
    } catch (err) {
      setError('Failed to generate plan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const interests = ['culture', 'food', 'history', 'beaches', 'adventure', 'shopping', 'nightlife', 'nature'];

  return (
    <Container className="travel-form mt-5">
      <div className="form-card p-4">
        <h2 className="mb-4">✈️ Plan Your Trip</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {!sessionId && (
          <div className="session-section mb-4">
            <h5>Step 1: Create Session</h5>
            <Button 
              onClick={initializeSession}
              disabled={loading}
              variant="primary"
              className="w-100"
            >
              {loading ? <><Spinner size="sm" /> Creating...</> : 'Create Session'}
            </Button>
            <p className="text-muted small mt-2">User ID: {formData.userId.slice(0, 12)}...</p>
          </div>
        )}

        {sessionId && (
          <>
            <div className="session-active mb-4 p-3 bg-light rounded">
              <p className="text-success">✓ Session Active</p>
            </div>

            <h5 className="mt-4">Step 2: Fill Trip Details</h5>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Destination *</Form.Label>
                <Form.Control
                  type="text"
                  name="destination"
                  placeholder="e.g., Paris"
                  value={formData.destination}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Origin Airport Code</Form.Label>
                <Form.Control
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Destination Airport Code</Form.Label>
                <Form.Control
                  type="text"
                  name="destinationAirport"
                  placeholder="e.g., CDG"
                  value={formData.destinationAirport}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Budget (USD)</Form.Label>
                <Form.Control
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  min="500"
                  max="100000"
                  step="100"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Number of Travelers</Form.Label>
                <Form.Control
                  type="number"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Interests</Form.Label>
                <div className="interests-grid">
                  {interests.map(interest => (
                    <Form.Check
                      key={interest}
                      type="checkbox"
                      label={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestsChange(interest)}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
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

              <Button
                onClick={generatePlan}
                disabled={loading || !formData.destination}
                variant="success"
                className="w-100"
                size="lg"
              >
                {loading ? <><Spinner size="sm" /> Generating Plan...</> : '🚀 Generate Travel Plan'}
              </Button>
            </Form>
          </>
        )}
      </div>
    </Container>
  );
}

export default TravelForm;
