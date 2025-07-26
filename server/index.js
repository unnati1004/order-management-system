const Fastify = require('fastify');
const cors = require('@fastify/cors');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

// const customerRoutes = require('./routes/customerRoutes');
// const productRoutes = require('./routes/productRoutes');

const startServer = async () => {
  const fastify = Fastify();

  await fastify.register(cors, { origin: '*' });

  await mongoose.connect(process.env.MONGO_URI);

  fastify.register(orderRoutes);
//   fastify.register(customerRoutes);
//   fastify.register(productRoutes);

  fastify.listen({ port: 5000 }, () => console.log('Server running on port 5000'));
};

startServer();
