const Product = require("../models/Product");

module.exports = async function (fastify, opts) {
  fastify.post("/api/products", async (req, reply) => {
    try {
      const { name, stock, price } = req.body;

      if (!name || stock == null || price == null) {
        return reply.code(400).send({ message: "Missing required fields" });
      }

      const product = new Product({ name, stock, price });
      const saved = await product.save();
      reply.send(saved);
    } catch (err) {
      console.error("Error creating product:", err.message);
      reply.code(500).send({ message: "Internal server error" });
    }
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
