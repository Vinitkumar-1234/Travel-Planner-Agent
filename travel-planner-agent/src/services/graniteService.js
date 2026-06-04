import axios from 'axios';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';
import logger from '../config/logger.js';
import { getWatsonxConfig } from '../config/ibmCloud.js';

/**
 * IBM Granite Model Service
 * Handles interaction with IBM Watsonx Granite Language Model
 */
class GraniteService {
  constructor() {
    this.config = getWatsonxConfig();
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }

  /**
   * Authenticate with IBM Cloud and get access token
   */
  async getAccessToken() {
    try {
      // Return cached token if still valid
      if (this.accessToken && this.tokenExpiresAt > Date.now()) {
        return this.accessToken;
      }

      const response = await axios.post(this.config.authUrl, 
        'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=' + this.config.apiKey,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiresAt = Date.now() + (response.data.expires_in * 1000) - 60000; // Refresh 1 min before expiry
      
      logger.info('IBM Granite access token obtained successfully');
      return this.accessToken;
    } catch (error) {
      logger.error('Failed to get IBM Granite access token:', error.message);
      throw new Error('Authentication failed with Granite service');
    }
  }

  /**
   * Generate travel plan using Granite LLM
   * @param {Object} userPreferences - User travel preferences
   * @returns {Promise<Object>} Generated travel plan
   */
  async generateTravelPlan(userPreferences) {
    try {
      const token = await this.getAccessToken();

      const prompt = this.buildTravelPlanPrompt(userPreferences);

      const payload = {
        model_id: 'ibm/granite-13b-chat-v2',
        input: prompt,
        parameters: {
          decoding_method: 'greedy',
          max_new_tokens: 1024,
          min_new_tokens: 100,
          stop_sequences: ['<|endoftext|>'],
          temperature: 0.7,
          top_p: 0.9
        },
        project_id: this.config.projectId
      };

      const response = await axios.post(
        `${this.config.apiUrl}/ml/v1/text/generation?version=2023-05-29`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      logger.info('Travel plan generated successfully using Granite');
      return {
        success: true,
        plan: response.data.results[0].generated_text,
        model: 'ibm/granite-13b-chat-v2'
      };
    } catch (error) {
      logger.error('Error generating travel plan with Granite:', error.message);
      throw new Error('Failed to generate travel plan');
    }
  }

  /**
   * Generate destination recommendations
   * @param {Object} preferences - User preferences
   * @returns {Promise<Array>} Recommended destinations
   */
  async getDestinationRecommendations(preferences) {
    try {
      const token = await this.getAccessToken();

      const prompt = `
        Based on the following preferences, recommend 5 travel destinations:
        - Budget: ${preferences.budget}
        - Season: ${preferences.season}
        - Interests: ${preferences.interests.join(', ')}
        - Duration: ${preferences.duration} days
        - Climate preference: ${preferences.climate}
        
        For each destination provide: name, why it matches, estimated cost, best time to visit, and top attractions.
      `;

      const payload = {
        model_id: 'ibm/granite-13b-chat-v2',
        input: prompt,
        parameters: {
          decoding_method: 'greedy',
          max_new_tokens: 1500,
          temperature: 0.8,
          top_p: 0.95
        },
        project_id: this.config.projectId
      };

      const response = await axios.post(
        `${this.config.apiUrl}/ml/v1/text/generation?version=2023-05-29`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      logger.info('Destination recommendations generated');
      return this.parseDestinationRecommendations(response.data.results[0].generated_text);
    } catch (error) {
      logger.error('Error getting destination recommendations:', error.message);
      throw error;
    }
  }

  /**
   * Build detailed travel plan prompt for Granite
   * @param {Object} preferences - User preferences
   * @returns {String} Formatted prompt
   */
  buildTravelPlanPrompt(preferences) {
    return `
      Create a detailed travel itinerary with the following requirements:
      
      Destination: ${preferences.destination}
      Duration: ${preferences.duration} days
      Budget: $${preferences.budget}
      Travelers: ${preferences.travelers}
      Interests: ${preferences.interests.join(', ')}
      Travel dates: ${preferences.startDate} to ${preferences.endDate}
      
      Please provide:
      1. Day-by-day itinerary with attractions and activities
      2. Accommodation recommendations (budget-friendly to luxury options)
      3. Transportation options and estimated costs
      4. Local dining recommendations
      5. Budget breakdown
      6. Travel tips and warnings
      7. Best times for activities
      8. Alternative options for bad weather
      
      Format as a structured travel plan.
    `;
  }

  /**
   * Parse destination recommendations from Granite response
   * @param {String} response - Granite model response
   * @returns {Array} Parsed destinations
   */
  parseDestinationRecommendations(response) {
    // Parse the response and extract destination info
    // This is a simplified implementation
    return {
      recommendations: response,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Generate budget optimization suggestions
   * @param {Object} travelPlan - Existing travel plan
   * @returns {Promise<Object>} Budget optimization suggestions
   */
  async optimizeBudget(travelPlan) {
    try {
      const token = await this.getAccessToken();

      const prompt = `
        Analyze this travel plan and suggest ways to reduce costs while maintaining quality:
        ${JSON.stringify(travelPlan, null, 2)}
        
        Provide specific cost-saving strategies including:
        - Alternative accommodations
        - Free or low-cost attractions
        - Money-saving tips
        - Best time to book transportation
      `;

      const payload = {
        model_id: 'ibm/granite-13b-chat-v2',
        input: prompt,
        parameters: {
          decoding_method: 'greedy',
          max_new_tokens: 1024,
          temperature: 0.7
        },
        project_id: this.config.projectId
      };

      const response = await axios.post(
        `${this.config.apiUrl}/ml/v1/text/generation?version=2023-05-29`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        optimizations: response.data.results[0].generated_text,
        estimatedSavings: 'calculated based on suggestions'
      };
    } catch (error) {
      logger.error('Error optimizing budget:', error.message);
      throw error;
    }
  }
}

export default new GraniteService();
