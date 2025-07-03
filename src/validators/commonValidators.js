const { body, param, query } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');

// ID validation (MongoDB ObjectId)
const idValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID format'),
    handleValidationErrors
];

// Pagination validation
const paginationValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    handleValidationErrors
];

// Search validation
const searchValidation = [
    query('search')
        .optional()
        .isLength({ min: 1, max: 100 })
        .withMessage('Search term must be between 1 and 100 characters'),
    handleValidationErrors
];

// Email validation
const emailValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    handleValidationErrors
];

// Password validation
const passwordValidation = [
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    handleValidationErrors
];

module.exports = {
    idValidation,
    paginationValidation,
    searchValidation,
    emailValidation,
    passwordValidation
}; 