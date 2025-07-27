// routes/authRoutes.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (fastify) {
  // Register a new user
  fastify.post('/api/auth/register', async (req, reply) => {
    try {
      const { email, name, password, role } = req.body;

      const existing = await User.findOne({ email });
      if (existing) {
        return reply.code(400).send({ error: 'Email already in use' });
      }

      const user = new User({ email, name, password, role });
      const saved = await user.save();

      reply.send({ message: 'User created', user: { id: saved._id, email: saved.email, role: saved.role } });
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  // Login existing user
  fastify.post('/api/auth/login', async (req, reply) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return reply.code(401).send({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return reply.code(401).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    reply.send({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  });
};
