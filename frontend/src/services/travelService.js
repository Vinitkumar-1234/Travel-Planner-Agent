import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/travel';

class TravelPlannerService {
  // Initialize Session
  async initializeSession(userId, preferences) {
    try {
      const response = await axios.post(`${API_BASE_URL}/session`, {
        userId,
        preferences
      });
      return response.data;
    } catch (error) {
      console.error('Session initialization error:', error);
      throw error;
    }
  }

  // Get Recommendations
  async getRecommendations(budget, season, interests, duration, climate) {
    try {
      const response = await axios.post(`${API_BASE_URL}/recommendations`, {
        budget,
        season,
        interests,
        duration,
        climate
      });
      return response.data;
    } catch (error) {
      console.error('Recommendations error:', error);
      throw error;
    }
  }

  // Generate Travel Plan
  async generateTravelPlan(sessionId, requirements) {
    try {
      const response = await axios.post(`${API_BASE_URL}/plans`, {
        sessionId,
        requirements
      });
      return response.data;
    } catch (error) {
      console.error('Plan generation error:', error);
      throw error;
    }
  }

  // Get Plan Details
  async getPlan(planId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error('Get plan error:', error);
      throw error;
    }
  }

  // Get User's Plans
  async getUserPlans(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}/plans`);
      return response.data;
    } catch (error) {
      console.error('Get user plans error:', error);
      throw error;
    }
  }

  // Optimize Budget
  async optimizeBudget(planId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/plans/${planId}/optimize`);
      return response.data;
    } catch (error) {
      console.error('Budget optimization error:', error);
      throw error;
    }
  }

  // Get Trip Updates
  async getTripUpdates(planId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/plans/${planId}/updates`);
      return response.data;
    } catch (error) {
      console.error('Trip updates error:', error);
      throw error;
    }
  }

  // Update Plan
  async updatePlan(planId, updates) {
    try {
      const response = await axios.put(`${API_BASE_URL}/plans/${planId}`, { updates });
      return response.data;
    } catch (error) {
      console.error('Plan update error:', error);
      throw error;
    }
  }

  // Delete Plan
  async deletePlan(planId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error('Plan deletion error:', error);
      throw error;
    }
  }
}

export default new TravelPlannerService();
