const Product = require("../models/Product");

module.exports = async function (fastify, opts) {
  fastify.post("/api/products", async (req, reply) => {
    const { customerId, products } = req.body;

    // Check for duplicate
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
      return reply.code(400).send({ error: "Duplicate order detected." });
    }

    // Reserve inventory
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return reply
          .code(400)
          .send({ error: `Insufficient stock for ${item.productId}` });
      }
      product.stock -= item.quantity;
      await product.save(); // lock stock
    }

    const newOrder = new Order({ customerId, products });
    const saved = await newOrder.save();
    reply.send(saved);
  });
  
  fastify.get("/api/products/:id", async (req, reply) => {
    const product = await Product.findById(req.params.id);
    if (!product) return reply.code(404).send({ error: "Product not found" });
    reply.send(product);
  });

  fastify.get("/api/products", async (req, reply) => {
    const products = await Product.find();
    reply.send(products);
  });

  fastify.delete("/api/products/:id", async (req, reply) => {
    await Product.findByIdAndDelete(req.params.id);
    reply.send({ success: true });
  });
};
