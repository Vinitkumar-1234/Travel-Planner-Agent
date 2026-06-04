import express from 'express';
import { body, validationResult, param } from 'express-validator';
import travelPlannerAgent from '../agents/travelPlannerAgent.js';
import logger from '../config/logger.js';

const router = express.Router();

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * POST /api/travel/session
 * Initialize a new travel planning session
 */
router.post(
  '/session',
  body('userId').notEmpty().withMessage('User ID is required'),
  body('preferences').isObject().withMessage('Preferences must be an object'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { userId, preferences } = req.body;
      const session = travelPlannerAgent.initializeSession(userId, preferences);
      res.status(201).json({
        success: true,
        message: 'Session initialized',
        data: session
      });
    } catch (error) {
      logger.error('Error initializing session:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/**
 * POST /api/travel/plans
 * Generate a new travel plan
 */
router.post(
  '/plans',
  body('sessionId').notEmpty().withMessage('Session ID is required'),
  body('requirements').isObject().withMessage('Requirements must be an object'),
  body('requirements.destination').notEmpty().withMessage('Destination is required'),
  body('requirements.startDate').notEmpty().withMessage('Start date is required'),
  body('requirements.endDate').notEmpty().withMessage('End date is required'),
  body('requirements.budget').isNumeric().withMessage('Budget must be a number'),
  body('requirements.travelers').isInt({ min: 1 }).withMessage('At least 1 traveler required'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { sessionId, requirements } = req.body;
      const plan = await travelPlannerAgent.generateComprehensivePlan(sessionId, requirements);
      res.status(201).json({
        success: true,
        message: 'Travel plan generated successfully',
        data: plan
      });
    } catch (error) {
      logger.error('Error generating travel plan:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/**
 * GET /api/travel/plans/:planId
 * Retrieve a specific travel plan
 */
router.get(
  '/plans/:planId',
  param('planId').notEmpty().withMessage('Plan ID is required'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { planId } = req.params;
      const plan = travelPlannerAgent.getplan(planId);
      res.status(200).json({
        success: true,
        data: plan
      });
    } catch (error) {
      logger.error('Error retrieving plan:', error.message);
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }
);

/**
 * GET /api/travel/user/:userId/plans
 * Get all plans for a user
 */
router.get(
  '/user/:userId/plans',
  param('userId').notEmpty().withMessage('User ID is required'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { userId } = req.params;
      const plans = travelPlannerAgent.getUserPlans(userId);
      res.status(200).json({
        success: true,
        data: plans,
        count: plans.length
      });
    } catch (error) {
      logger.error('Error retrieving user plans:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/**
 * POST /api/travel/recommendations
 * Get destination recommendations
 */
router.post(
  '/recommendations',
  body('budget').notEmpty().withMessage('Budget is required'),
  body('season').notEmpty().withMessage('Season is required'),
  body('interests').isArray().withMessage('Interests must be an array'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const recommendations = await travelPlannerAgent.getDestinationRecommendations(req.body);
      res.status(200).json({
        success: true,
        data: recommendations
      });
    } catch (error) {
      logger.error('Error getting recommendations:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/**
 * POST /api/travel/plans/:planId/optimize
 * Optimize trip budget
 */
router.post(
  '/plans/:planId/optimize',
  param('planId').notEmpty().withMessage('Plan ID is required'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { planId } = req.params;
      const optimization = await travelPlannerAgent.optimizeTripBudget(planId);
      res.status(200).json({
        success: true,
        message: 'Budget optimization suggestions generated',
        data: optimization
      });
    } catch (error) {
      logger.error('Error optimizing budget:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/**
 * GET /api/travel/plans/:planId/updates
 * Get real-time updates for a trip
 */
router.get(
  '/plans/:planId/updates',
  param('planId').notEmpty().withMessage('Plan ID is required'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { planId } = req.params;
      const updates = await travelPlannerAgent.getTripUpdates(planId);
      res.status(200).json({
        success: true,
        data: updates
      });
    } catch (error) {
      logger.error('Error getting trip updates:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/**
 * PUT /api/travel/plans/:planId
 * Update a travel plan
 */
router.put(
  '/plans/:planId',
  param('planId').notEmpty().withMessage('Plan ID is required'),
  body('updates').isObject().withMessage('Updates must be an object'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { planId } = req.params;
      const { updates } = req.body;
      const plan = travelPlannerAgent.getplan(planId);
      
      // Update plan requirements
      plan.requirements = { ...plan.requirements, ...updates };
      
      res.status(200).json({
        success: true,
        message: 'Plan updated successfully',
        data: plan
      });
    } catch (error) {
      logger.error('Error updating plan:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/**
 * DELETE /api/travel/plans/:planId
 * Delete a travel plan
 */
router.delete(
  '/plans/:planId',
  param('planId').notEmpty().withMessage('Plan ID is required'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { planId } = req.params;
      const deleted = travelPlannerAgent.deletePlan(planId);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Plan not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Plan deleted successfully'
      });
    } catch (error) {
      logger.error('Error deleting plan:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

export default router;
