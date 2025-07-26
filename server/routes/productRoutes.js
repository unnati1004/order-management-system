const Product = require('../models/Product');

module.exports = async function (fastify, opts) {
  fastify.post('/api/products', async (req, reply) => {
    const { name, sku, price, stock } = req.body;

    const existing = await Product.findOne({ sku });
    if (existing) {
      return reply.code(400).send({ error: 'Product with this SKU already exists.' });
    }

    const newProduct = new Product({ name, sku, price, stock });
    const saved = await newProduct.save();
    reply.send(saved);
  });

  fastify.get('/api/products/:id', async (req, reply) => {
    const product = await Product.findById(req.params.id);
    if (!product) return reply.code(404).send({ error: 'Product not found' });
    reply.send(product);
  });

  fastify.get('/api/products', async (req, reply) => {
    const products = await Product.find();
    reply.send(products);
  });

  fastify.delete('/api/products/:id', async (req, reply) => {
    await Product.findByIdAndDelete(req.params.id);
    reply.send({ success: true });
  });
};