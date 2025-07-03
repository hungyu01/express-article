const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');

// TOTP verification validation rules
const totpVerificationValidation = [
    body('token')
        .isLength({ min: 6, max: 6 })
        .withMessage('TOTP verification code must be 6 digits')
        .isNumeric()
        .withMessage('TOTP verification code must be numeric'),
    handleValidationErrors
];

// Backup code validation rules
const backupCodeValidation = [
    body('backupCode')
        .isLength({ min: 6, max: 6 })
        .withMessage('Backup code must be 6 characters')
        .matches(/^[A-Z0-9]+$/)
        .withMessage('Backup code must contain only uppercase letters and numbers'),
    handleValidationErrors
];

// Password confirmation for TOTP operations
const totpPasswordValidation = [
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

module.exports = {
    totpVerificationValidation,
    backupCodeValidation,
    totpPasswordValidation
}; 