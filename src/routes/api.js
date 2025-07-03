const express = require('express');
const router = express.Router();

// API information
router.get('/', (req, res) => {
    res.json({
        message: 'API v1.0.0',
        endpoints: {
            articles: '/api/articles',
            users: '/api/users',
            auth: {
                register: 'POST /api/users/register',
                login: 'POST /api/users/login',
                logout: 'POST /api/users/logout'
            },
            profile: {
                get: 'GET /api/users/profile',
                update: 'PUT /api/users/profile',
                changePassword: 'PUT /api/users/password'
            },
            totp: {
                setup: 'POST /api/users/totp/setup',
                verify: 'POST /api/users/totp/verify',
                disable: 'POST /api/users/totp/disable'
            },
            account: {
                delete: 'DELETE /api/users/account'
            }
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