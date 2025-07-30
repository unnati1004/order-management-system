// ✅ Authentication Middleware
// middlewares/auth.js
const jwt = require("jsonwebtoken");

 async function authenticate(req, reply){
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.code(401).send({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
  } catch (err) {
    reply.code(401).send({ error: "Invalid token" });
  }
};


// ✅ Role-based Authorization Middleware

 function authorizeRoles(...roles){
  return async (req, reply) => {
    if (!roles.includes(req.user.role)) {
      return reply.code(403).send({ error: "Forbidden: Access denied" });
    }
  };
};

module.exports = {
  authenticate,
  authorizeRoles
};
