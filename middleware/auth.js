const CustomAPIError = require('../middleware/custom');
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 400)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userEmail = decoded.email; 
    next()
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route OR the provided token is invalid', 401)
  }
}

module.exports = authMiddleware;