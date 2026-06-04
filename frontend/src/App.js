import React, { useState } from 'react';
import { Container, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';
import TravelForm from './components/TravelForm';
import RecommendationForm from './components/RecommendationForm';
import PlanDisplay from './components/PlanDisplay';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  return (
    <div className="App">
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" sticky="top" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#" className="fw-bold">
            ✈️ Travel Planner Agent
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#" disabled>
              <span className="badge bg-success">Frontend Ready</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="py-4">
        {/* Hero Section */}
        <div className="hero-section text-center mb-5 py-4">
          <h1 className="display-5 fw-bold">🌍 Plan Your Perfect Trip</h1>
          <p className="lead text-muted">
            AI-powered travel planning using IBM Granite • Real-time data • Smart recommendations
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultActiveKey="plan" className="mb-4 nav-tabs-custom">
          {/* Plan Tab */}
          <Tab eventKey="plan" title="📋 Create Plan">
            <TravelForm 
              onPlanCreated={setCurrentPlan}
              onSessionCreated={() => console.log('Session created')}
            />
            {currentPlan && <PlanDisplay plan={currentPlan} />}
          </Tab>

          {/* Recommendations Tab */}
          <Tab eventKey="recommendations" title="🌍 Get Recommendations">
            <RecommendationForm onRecommendationsReceived={setRecommendations} />
            {recommendations && (
              <Container className="mt-4">
                <div className="alert alert-info">
                  <h5>📍 Recommendations</h5>
                  <p>{recommendations.recommendations}</p>
                </div>
              </Container>
            )}
          </Tab>

          {/* Current Plan Tab */}
          <Tab eventKey="current" title="📌 Current Plan" disabled={!currentPlan}>
            {currentPlan && <PlanDisplay plan={currentPlan} />}
          </Tab>

          {/* Info Tab */}
          <Tab eventKey="info" title="ℹ️ How It Works">
            <Container className="py-5">
              <div className="info-section">
                <h3 className="mb-4">How Travel Planner Agent Works</h3>
                
                <div className="step mb-4">
                  <h5>🤖 Step 1: AI-Powered Analysis</h5>
                  <p>Our system uses IBM Granite LLM to understand your preferences and generate personalized recommendations.</p>
                </div>

                <div className="step mb-4">
                  <h5>🌤️ Step 2: Real-time Data Integration</h5>
                  <p>We fetch real-time data including weather forecasts, flight options, hotels, and local attractions.</p>
                </div>

                <div className="step mb-4">
                  <h5>💰 Step 3: Smart Budget Planning</h5>
                  <p>Get detailed budget breakdowns and AI-powered cost optimization suggestions.</p>
                </div>

                <div className="step mb-4">
                  <h5>📋 Step 4: Complete Itinerary</h5>
                  <p>Receive a comprehensive day-by-day itinerary with activities, meals, and transportation details.</p>
                </div>

                <hr className="my-5" />

                <h4>Technology Stack</h4>
                <div className="tech-stack">
                  <div className="tech-item">
                    <h6>🎨 Frontend</h6>
                    <p>React.js with Bootstrap</p>
                  </div>
                  <div className="tech-item">
                    <h6>⚙️ Backend</h6>
                    <p>Node.js + Express</p>
                  </div>
                  <div className="tech-item">
                    <h6>🤖 AI</h6>
                    <p>IBM Granite LLM</p>
                  </div>
                  <div className="tech-item">
                    <h6>☁️ Cloud</h6>
                    <p>IBM Cloud Services</p>
                  </div>
                </div>
              </div>
            </Container>
          </Tab>
        </Tabs>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>
          ✈️ Travel Planner Agent v1.0 • Powered by IBM Granite & IBM Cloud
        </p>
        <small className="text-muted">Frontend: React | Backend: Node.js | AI: IBM Granite</small>
      </footer>
    </div>
  );
}

export default App;
