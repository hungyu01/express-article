const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');

// Register validation rules
const registerValidation = [
    body('username')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3-30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers and underscores'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('firstName')
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must be between 1-50 characters'),
    body('lastName')
        .isLength({ min: 1, max: 50 })
        .withMessage('Last name must be between 1-50 characters'),
    handleValidationErrors
];

// Login validation rules
const loginValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username or email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

// Update profile validation rules
const updateProfileValidation = [
    body('firstName')
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must be between 1-50 characters'),
    body('lastName')
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage('Last name must be between 1-50 characters'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Please enter a valid email address'),
    handleValidationErrors
];

// Change password validation rules
const changePasswordValidation = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters'),
    handleValidationErrors
];



// Password confirmation validation rules
const passwordConfirmationValidation = [
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

module.exports = {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation,
    passwordConfirmationValidation
}; 