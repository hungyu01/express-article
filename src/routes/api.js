const express = require('express');
const router = express.Router();

// API 版本資訊
router.get('/', (req, res) => {
    res.json({
        message: 'API v1.0.0',
        endpoints: {
            articles: '/api/articles',
            users: '/api/users'
        }
    });
});

// 文章相關路由 (未來擴展)
router.get('/articles', (req, res) => {
    res.json({
        message: 'Articles endpoint - Coming soon',
        status: 'development'
    });
});

// 使用者相關路由 (未來擴展)
router.get('/users', (req, res) => {
    res.json({
        message: 'Users endpoint - Coming soon',
        status: 'development'
    });
});

module.exports = router; 