const Order = require("../models/Order");
const statusTransitions = {
  PENDING: ['PAID', 'CANCELLED'],
  PAID: ['FULFILLED', 'CANCELLED'],
  FULFILLED: [],
  CANCELLED: [],
};
module.exports = async function (fastify, opts) {
  fastify.post("/api/orders", async (req, reply) => {
    const { customerId, products } = req.body;

    const existingOrder = await Order.findOne({
      customerId,
      products: {
        $all: products.map((p) => ({
          productId: p.productId,
          quantity: p.quantity,
        })),
      },
    });

    if (existingOrder) {
      return reply
        .code(400)
        .send({
          error: "Duplicate order detected. Same order already exists.",
        });
    }

    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    reply.send(saved);
  });

  fastify.get("/api/orders/:id", async (req, reply) => {
    const order = await Order.findById(req.params.id);
    reply.send(order);
  });

fastify.put("/api/orders/:id/status", async (req, reply) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);
  if (!order) return reply.code(404).send({ error: "Order not found" });

  const currentStatus = order.status;
  if (!statusTransitions[currentStatus]?.includes(status)) {
    return reply.code(400).send({
      error: `Invalid status transition from ${currentStatus} to ${status}`,
    });
  }

  order.status = status;
  await order.save();

  // Notify clients via WebSocket
  fastify.io.emit('orderStatusUpdated', { id, status });

  reply.send(order);
});

  fastify.get("/api/orders", async (req, reply) => {
    const orders = await Order.find();
    reply.send(orders);
  });
};
