import { v4 as uuidv4 } from 'uuid';
import graniteService from '../services/graniteService.js';
import travelDataService from '../services/travelDataService.js';
import logger from '../config/logger.js';

/**
 * Travel Planner Agent
 * Main orchestrator for travel planning operations
 */
class TravelPlannerAgent {
  constructor() {
    this.activePlans = new Map();
    this.userPreferences = new Map();
  }

  /**
   * Initialize a new travel planning session
   * @param {String} userId - User identifier
   * @param {Object} preferences - User preferences
   * @returns {Object} Session details
   */
  initializeSession(userId, preferences) {
    try {
      const sessionId = uuidv4();
      this.userPreferences.set(sessionId, {
        userId,
        preferences,
        createdAt: new Date(),
        status: 'active'
      });

      logger.info(`Travel planning session initialized: ${sessionId} for user ${userId}`);
      return { sessionId, userId, preferences };
    } catch (error) {
      logger.error('Error initializing session:', error.message);
      throw error;
    }
  }

  /**
   * Generate comprehensive travel plan
   * @param {String} sessionId - Session ID
   * @param {Object} requirements - Travel requirements
   * @returns {Promise<Object>} Complete travel plan
   */
  async generateComprehensivePlan(sessionId, requirements) {
    try {
      logger.info(`Generating travel plan for session: ${sessionId}`);

      const planId = uuidv4();
      const plan = {
        id: planId,
        sessionId,
        createdAt: new Date(),
        status: 'generating',
        requirements,
        components: {}
      };

      // Step 1: Get weather forecast
      plan.components.weather = await travelDataService.getWeatherForecast(
        requirements.destination,
        requirements.duration
      );

      // Step 2: Get flight options
      plan.components.flights = await travelDataService.getFlightOptions(
        requirements.origin,
        requirements.destinationAirport,
        requirements.startDate,
        requirements.travelers
      );

      // Step 3: Get accommodation options
      plan.components.accommodations = await travelDataService.getAccommodationOptions(
        requirements.destination,
        requirements.startDate,
        requirements.endDate,
        requirements.travelers
      );

      // Step 4: Get local attractions
      plan.components.attractions = await travelDataService.getLocalAttractions(
        requirements.destination
      );

      // Step 5: Generate AI-powered itinerary using Granite
      plan.components.aiItinerary = await graniteService.generateTravelPlan({
        destination: requirements.destination,
        duration: requirements.duration,
        budget: requirements.budget,
        travelers: requirements.travelers,
        interests: requirements.interests,
        startDate: requirements.startDate,
        endDate: requirements.endDate
      });

      // Step 6: Calculate budget breakdown
      plan.components.budgetBreakdown = this.calculateBudgetBreakdown(plan, requirements);

      plan.status = 'completed';
      this.activePlans.set(planId, plan);

      logger.info(`Travel plan generated successfully: ${planId}`);
      return plan;
    } catch (error) {
      logger.error('Error generating travel plan:', error.message);
      throw new Error('Failed to generate comprehensive travel plan');
    }
  }

  /**
   * Calculate budget breakdown for trip
   * @param {Object} plan - Travel plan
   * @param {Object} requirements - Requirements
   * @returns {Object} Budget breakdown
   */
  calculateBudgetBreakdown(plan, requirements) {
    const breakdown = {
      flights: {
        category: 'Transportation',
        amount: 450 * requirements.travelers, // From mock data
        percentage: 0
      },
      accommodation: {
        category: 'Stay',
        amount: 85 * requirements.duration * requirements.travelers, // Budget option
        percentage: 0
      },
      meals: {
        category: 'Dining',
        amount: 30 * requirements.duration * requirements.travelers, // Average estimate
        percentage: 0
      },
      activities: {
        category: 'Entertainment',
        amount: 50 * requirements.duration,
        percentage: 0
      },
      transportation: {
        category: 'Local Transport',
        amount: 20 * requirements.duration,
        percentage: 0
      },
      contingency: {
        category: 'Emergency Fund',
        amount: 100,
        percentage: 0
      }
    };

    const totalBudget = Object.values(breakdown).reduce((sum, item) => sum + item.amount, 0);

    // Calculate percentages
    Object.keys(breakdown).forEach(key => {
      breakdown[key].percentage = ((breakdown[key].amount / totalBudget) * 100).toFixed(1);
    });

    breakdown.total = totalBudget;
    breakdown.estimatedDaily = (totalBudget / requirements.duration).toFixed(2);

    return breakdown;
  }

  /**
   * Get destination recommendations
   * @param {Object} userPreferences - User preferences
   * @returns {Promise<Object>} Recommended destinations
   */
  async getDestinationRecommendations(userPreferences) {
    try {
      logger.info('Generating destination recommendations');
      return await graniteService.getDestinationRecommendations(userPreferences);
    } catch (error) {
      logger.error('Error getting recommendations:', error.message);
      throw error;
    }
  }

  /**
   * Optimize trip budget
   * @param {String} planId - Plan ID
   * @returns {Promise<Object>} Optimization suggestions
   */
  async optimizeTripBudget(planId) {
    try {
      const plan = this.activePlans.get(planId);
      if (!plan) {
        throw new Error(`Plan not found: ${planId}`);
      }

      logger.info(`Optimizing budget for plan: ${planId}`);
      return await graniteService.optimizeBudget(plan.components.budgetBreakdown);
    } catch (error) {
      logger.error('Error optimizing budget:', error.message);
      throw error;
    }
  }

  /**
   * Get real-time updates for a trip
   * @param {String} planId - Plan ID
   * @returns {Promise<Object>} Real-time updates
   */
  async getTripUpdates(planId) {
    try {
      const plan = this.activePlans.get(planId);
      if (!plan) {
        throw new Error(`Plan not found: ${planId}`);
      }

      const updates = {
        planId,
        timestamp: new Date(),
        updates: []
      };

      // Check for weather changes
      const weatherData = await travelDataService.getWeatherForecast(
        plan.requirements.destination,
        1
      );
      
      if (weatherData.forecast && weatherData.forecast.length > 0) {
        updates.updates.push({
          type: 'weather',
          message: `Current conditions in ${plan.requirements.destination}: ${weatherData.forecast[0].condition}`,
          data: weatherData.forecast[0]
        });
      }

      logger.info(`Trip updates retrieved for plan: ${planId}`);
      return updates;
    } catch (error) {
      logger.error('Error getting trip updates:', error.message);
      throw error;
    }
  }

  /**
   * Retrieve existing travel plan
   * @param {String} planId - Plan ID
   * @returns {Object} Travel plan
   */
  getplan(planId) {
    const plan = this.activePlans.get(planId);
    if (!plan) {
      throw new Error(`Plan not found: ${planId}`);
    }
    return plan;
  }

  /**
   * List all plans for a user
   * @param {String} userId - User ID
   * @returns {Array} User's plans
   */
  getUserPlans(userId) {
    const plans = Array.from(this.activePlans.values()).filter(
      plan => this.userPreferences.get(plan.sessionId)?.userId === userId
    );
    return plans;
  }

  /**
   * Delete a travel plan
   * @param {String} planId - Plan ID
   * @returns {Boolean} Success
   */
  deletePlan(planId) {
    return this.activePlans.delete(planId);
  }

  /**
   * Update travel preferences
   * @param {String} sessionId - Session ID
   * @param {Object} updates - Preference updates
   * @returns {Object} Updated preferences
   */
  updatePreferences(sessionId, updates) {
    const session = this.userPreferences.get(sessionId);
    if (!session) {
      throw new Error(`Session not found: ${sessionId}`);
    }

    session.preferences = { ...session.preferences, ...updates };
    this.userPreferences.set(sessionId, session);

    logger.info(`Preferences updated for session: ${sessionId}`);
    return session.preferences;
  }
}

export default new TravelPlannerAgent();
