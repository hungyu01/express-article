const express = require('express');
const router = express.Router();
const totpController = require('../controllers/totpController');
const { authenticate } = require('../middleware/auth');
const {
    totpVerificationValidation,
    backupCodeValidation,
    totpPasswordValidation
} = require('../validators/totpValidators');

// All TOTP routes require authentication
router.use(authenticate);

// TOTP setup and management
router.post('/setup', totpController.setup);
router.post('/verify', totpVerificationValidation, totpController.verify);
router.put('/disable', totpPasswordValidation, totpController.disable);
router.get('/status', totpController.getStatus);

// Backup codes management
router.post('/backup-codes/generate', totpPasswordValidation, totpController.generateBackupCodes);
router.post('/backup-codes/verify', backupCodeValidation, totpController.verifyBackupCode);

module.exports = router; 