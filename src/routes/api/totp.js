const express = require('express');
const router = express.Router();
const totpController = require('../../controllers/totpController');
const { authenticate } = require('../../middleware/auth');
const {
    totpVerificationValidation,
    backupCodeValidation,
    totpPasswordValidation
} = require('../../validators/totpValidators');

// All TOTP routes require authentication
router.use(authenticate);
// TODO: change controller naming
// TOTP setup and management
router.post('/', totpController.setup);
router.post('/verify', totpVerificationValidation, totpController.verify);
router.put('/', totpPasswordValidation, totpController.disable);
router.get('/', totpController.getStatus);

module.exports = router; 