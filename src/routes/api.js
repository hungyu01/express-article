const express = require('express');
const router = express.Router();

const userRoutes = require('./api/user');
const totpRoutes = require('./api/totp');

router.use('/users', userRoutes);
router.use('/totp', totpRoutes);

router.get('/', async (req, res) => {
  res.json({ message: 'API is working' });
});

router.get('/test-error', (req, res, next) => {
  next(new Error('Test error'));
});

module.exports = router; 