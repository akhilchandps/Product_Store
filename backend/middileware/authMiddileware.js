// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateUser = (req, res, next) => {
  // Get the token from the cookie "AuthToken"
  const token = req.cookies && req.cookies.AuthToken;
  
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided" });
  }

  try {
    // Verify the token using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token", error: err.message });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  // Ensure that the authenticated user has the admin role
  if (!req.user || req.user.userrole !== "Admin") {
    return res.status(403).json({ message: "Access Denied. Admins only" });
  }
  next();
};
