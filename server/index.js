const Fastify = require("fastify");
const cors = require("@fastify/cors");
const mongoose = require("mongoose");
const fastifySocketIO = require("fastify-socket.io");
const Sentry = require("@sentry/node");
require("dotenv").config();

// 👇 Add body parser (required for JSON parsing)
// const formBody = require('@fastify/formbody');

const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const { authenticate, authorizeRoles } = require("./middlewares/auth");

const startServer = async () => {
  const fastify = Fastify({
    logger:
      process.env.NODE_ENV === "development"
        ? {
            transport: {
              target: "pino-pretty",
              options: { colorize: true },
            },
          }
        : true,
  });

  // if (process.env.SENTRY_DSN) {
  //   Sentry.init({
  //     dsn: process.env.SENTRY_DSN,
  //     environment: process.env.NODE_ENV || "development",
  //   });
  // }
  const allowedOrigins = [
  'http://localhost:5173',
  'https://order-management-project1.netlify.app'
];

  // ✅ Register CORS
 await fastify.register(cors, {
  origin: (origin, cb) => {
    // Allow requests from localhost:5173 only
    if (!origin || allowedOrigins.includes("localhost:5173")) {
      cb(null, true);
      return;
    }
    cb(new Error("Not allowed by CORS"), false);
  },
  credentials: true
});

  // ✅ Register body parsers
  // await fastify.register(formBody); // Handles URL-encoded form data (optional)
  fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    try {
      const json = JSON.parse(body);
      done(null, json);
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
  });

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
  }

  fastify.register(fastifySocketIO, {
    cors: { origin: '*' },
  });

  // Health Check
  fastify.get("/healthz", async (req, reply) => {
    return { status: "ok" };
  });

  // ✅ Now register routes
  fastify.register(orderRoutes);
  fastify.register(customerRoutes);
  fastify.register(productRoutes);
  fastify.register(authRoutes);

  // WebSocket
  fastify.ready().then(() => {
    fastify.io.on("connection", (socket) => {
      fastify.log.info(`Client connected: ${socket.id}`);
    });
  });

  // Error handler
  fastify.setErrorHandler((error, request, reply) => {
    Sentry.captureException(error);
    reply.status(500).send({ message: "Something went wrong!" });
  });

  // fastify.listen({ port: 5000 }, () =>
  //   console.log("🚀 Server running on http://localhost:5000")
  // );

  await fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' },()=>{
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
  });

};

startServer();
