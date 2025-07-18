const express = require('express');
const router = express.Router();
const mainController = require('../controllers');

// Home routes
router.get('/', mainController.index);

// Health check routes
router.get('/health', mainController.health);

// API routes prefix
router.use('/api', require('./api'));

// User and TOTP routes (combined under /api)
router.use('/api/users', require('./api/user'));
router.use('/api/totp', require('./api/totp'));

module.exports = router; 