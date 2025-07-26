const Fastify = require('fastify');
const cors = require('@fastify/cors');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const fastifySocketIO = require('fastify-socket.io');
require('dotenv').config();

const startServer = async () => {
  const fastify = Fastify();
  await fastify.register(cors, { origin: '*' });
  await mongoose.connect(process.env.MONGO_URI);

  fastify.register(orderRoutes);
  fastify.register(customerRoutes);
  fastify.register(productRoutes);

fastify.register(fastifySocketIO, {
  cors: {
    origin: "*",
  },
});
// Optional: Track client connections
fastify.ready().then(() => {
  fastify.io.on('connection', (socket) => {
    fastify.log.info(`Client connected: ${socket.id}`);
  });
});
  fastify.listen({ port: 5000 }, () => console.log('Server running on port 5000'));
};

startServer();
