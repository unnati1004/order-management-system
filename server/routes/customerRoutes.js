const User = require('../models/User'); // make sure the path is correct
const { authorizeRoles } = require('../middlewares/auth');
module.exports = async function (fastify, opts) {
  // fastify.post('/api/customers', async (req, reply) => {
  //   const { name, email, phone } = req.body;

  //   const existing = await Customer.findOne({ email });
  //   if (existing) {
  //     return reply.code(400).send({ error: 'Customer with this email already exists.' });
  //   }

  //   const newCustomer = new Customer({ name, email, phone });
  //   const saved = await newCustomer.save();
  //   reply.send(saved);
  // });
  fastify.get('/api/customers/:id', async (req, reply) => {
    const customer = await User.findById(req.params.id);
    if (!customer) return reply.code(404).send({ error: 'Customer not found' });
    reply.send(customer);
  });

 fastify.get('/api/customers',{preHandler: [authorizeRoles('admin')]}, async (req, reply) => {
  const customers = await User.find({ role: 'customer' });
  // console.log("Customers fetched:", customers);
  
  reply.send(customers);
});

  fastify.delete('/api/customers/:id', async (req, reply) => {
    await User.findByIdAndDelete(req.params.id);
    reply.send({ success: true });
  });
};

