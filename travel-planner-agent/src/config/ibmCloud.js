import { IamAuthenticator } from 'ibm-cloud-sdk-core';
import logger from './logger.js';

/**
 * Initialize IBM Cloud Authentication
 * Supports both API Key and IAM authentication methods
 */
export const initializeIbmCloud = () => {
  try {
    const apiKey = process.env.IBM_CLOUD_API_KEY;
    const authUrl = process.env.IBM_CLOUD_AUTH_URL;

    if (!apiKey) {
      throw new Error('IBM_CLOUD_API_KEY is not configured');
    }

    const authenticator = new IamAuthenticator({
      apikey: apiKey,
      url: authUrl
    });

    logger.info('IBM Cloud authentication initialized successfully');
    return authenticator;
  } catch (error) {
    logger.error('Failed to initialize IBM Cloud authentication:', error.message);
    throw error;
  }
};

/**
 * Get IBM Watsonx (Granite Model) Configuration
 */
export const getWatsonxConfig = () => {
  return {
    projectId: process.env.WATSONX_PROJECT_ID,
    authUrl: process.env.WATSONX_AUTH_URL,
    apiUrl: process.env.WATSONX_API_URL,
    apiKey: process.env.IBM_CLOUD_API_KEY
  };
};

/**
 * Get Watson Assistant Configuration
 */
export const getWatsonAssistantConfig = () => {
  return {
    apiKey: process.env.WATSON_ASSISTANT_API_KEY,
    url: process.env.WATSON_ASSISTANT_URL,
    version: '2023-06-15'
  };
};
