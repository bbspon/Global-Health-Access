// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // <-- BBSlive-bound model

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[AUTH] decoded:", decoded); // temp debug

    const user = await User.findById(decoded.id); // BBSlive
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          code: "TOKEN_EXPIRED",
          message: "Unauthorized: Token expired",
        });
    }
    console.error("Auth error:", err);
    res
      .status(401)
      .json({ code: "TOKEN_INVALID", message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
