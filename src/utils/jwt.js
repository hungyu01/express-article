const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';

// generate JWT Token
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRE }
    );
};

// verify JWT Token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

// Get token from Authorization header
const extractTokenFromHeader = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Authorization header format is invalid');
    }
    return authHeader.substring(7);
};

module.exports = {
    generateToken,
    verifyToken,
    extractTokenFromHeader
}; 