const express = require('express');
const router = express.Router();
const mainController = require('../controllers');

// home routes
router.get('/', mainController.index);

// health check routes
router.get('/health', mainController.health);

// API routes prefix
router.use('/api', require('./api'));

// user routes
router.use('/api/users', require('./user'));

// TOTP routes
router.use('/api/totp', require('./totp'));

module.exports = router; 