import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import logger from './config/logger.js';
import travelRoutes from './routes/travelRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Travel Planner Agent',
    version: '1.0.0'
  });
});

// API routes
app.use('/api/travel', travelRoutes);

// Welcome endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Travel Planner Agent API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/travel',
      documentation: '/api/travel/docs'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Travel Planner Agent API running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
