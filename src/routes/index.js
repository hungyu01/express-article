const express = require('express');
const router = express.Router();
const mainController = require('../controllers');

// 首頁路由
router.get('/', mainController.index);

// 健康檢查路由
router.get('/health', mainController.health);

// API 路由前綴
router.use('/api', require('./api'));

module.exports = router; 