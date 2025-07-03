const { verifyToken, extractTokenFromHeader } = require('../utils/jwt');
const { User } = require('../models');

// authentication middleware
const authenticate = async (req, res, next) => {
    try {
        // get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: 'Access denied. No token provided.',
                status: 'error'
            });
        }

        const token = extractTokenFromHeader(authHeader);
        const decoded = verifyToken(token);

        // find user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                message: 'Invalid token. User not found.',
                status: 'error'
            });
        }

        // check if user is deleted or disabled
        if (user.isDeleted || !user.isActive) {
            return res.status(401).json({
                message: 'Account is disabled or deleted.',
                status: 'error'
            });
        }

        // add user info to request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token.',
            status: 'error'
        });
    }
};

// optional authentication middleware (not required to login)
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next();
        }

        const token = extractTokenFromHeader(authHeader);
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);
        
        if (user && !user.isDeleted && user.isActive) {
            req.user = user;
        }
        
        next();
    } catch (error) {
        next();
    }
};

module.exports = {
    authenticate,
    optionalAuth
}; 