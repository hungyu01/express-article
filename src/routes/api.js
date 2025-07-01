const express = require('express');
const router = express.Router();

// API information
router.get('/', (req, res) => {
    res.json({
        message: 'API v1.0.0',
        endpoints: {
            articles: '/api/articles',
            users: '/api/users'
        }
    });
});

// articles related routes
router.get('/articles', (req, res) => {
    res.json({
        message: 'Articles endpoint',
        status: 'development'
    });
});

// users related routes
router.get('/users', (req, res) => {
    res.json({
        message: 'Users endpoint',
        status: 'development'
    });
});

module.exports = router; 