const jwt = require('jsonwebtoken');
require("dotenv").config();
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;
  //console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    req.user = decoded.email;
    next();
  } catch (error) {
    // If the token is invalid, return an unauthorized error
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
