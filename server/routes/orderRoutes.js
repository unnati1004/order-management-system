const Order = require('../models/Order');

module.exports = async function (fastify, opts) {
  fastify.post('/api/orders', async (req, reply) => {
    const { customerId, products } = req.body;

    const existingOrder = await Order.findOne({
      customerId,
      products: { $all: products.map(p => ({ productId: p.productId, quantity: p.quantity })) },
    });

    if (existingOrder) {
      return reply
        .code(400)
        .send({ error: 'Duplicate order detected. Same order already exists.' });
    }

    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    reply.send(saved);
  });

  fastify.get('/api/orders/:id', async (req, reply) => {
    const order = await Order.findById(req.params.id);
    reply.send(order);
  });

  fastify.put('/api/orders/:id/status', async (req, reply) => {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    reply.send(updated);
  });

  fastify.get('/api/orders', async (req, reply) => {
    const orders = await Order.find();
    reply.send(orders);
  });
};