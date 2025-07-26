// server.js
const Fastify = require('fastify');
const cors = require('@fastify/cors');
const mongoose = require('mongoose');
const fastifySocketIO = require('fastify-socket.io');
const Sentry = require('@sentry/node');
require('dotenv').config();

// Import routes
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');

// Import middleware
const { authenticate, authorizeRoles } = require('./middlewares/auth');

const startServer = async () => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    }
  });

  // Initialize Sentry
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development'
  });

  // Register Plugins
  await fastify.register(cors, { origin: '*' });
  await mongoose.connect(process.env.MONGO_URI);

  fastify.register(fastifySocketIO, {
    cors: {
      origin: '*'
    }
  });

  // Health Check
  fastify.get('/healthz', async (req, reply) => {
    return { status: 'ok' };
  });

  // Register routes
  fastify.register(orderRoutes);
  fastify.register(customerRoutes);
  fastify.register(productRoutes);

  // WebSocket connection
  fastify.ready().then(() => {
    fastify.io.on('connection', (socket) => {
      fastify.log.info(`Client connected: ${socket.id}`);
    });
  });

  // Error handler with Sentry
  fastify.setErrorHandler((error, request, reply) => {
    Sentry.captureException(error);
    reply.status(500).send({ message: 'Something went wrong!' });
  });

  fastify.listen({ port: 5000 }, () => console.log('Server running on port 5000'));
};

startServer();
