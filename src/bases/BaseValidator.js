const { body, param, query } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');

class BaseValidator {
    constructor() {
        this.handleValidationErrors = handleValidationErrors;
    }

    // ID validation (MongoDB ObjectId)
    static idValidation() {
        return [
            param('id')
                .isMongoId()
                .withMessage('Invalid ID format'),
            handleValidationErrors
        ];
    }

    // Pagination validation
    static paginationValidation() {
        return [
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
    }

    // Search validation
    static searchValidation() {
        return [
            query('q')
                .notEmpty()
                .withMessage('Search query is required')
                .isLength({ min: 1, max: 100 })
                .withMessage('Search query must be between 1 and 100 characters'),
            query('fields')
                .optional()
                .isString()
                .withMessage('Fields must be a string'),
            handleValidationErrors
        ];
    }

    // Email validation
    static emailValidation(fieldName = 'email') {
        return [
            body(fieldName)
                .isEmail()
                .withMessage('Please enter a valid email address'),
            handleValidationErrors
        ];
    }

    // Password validation
    static passwordValidation(fieldName = 'password', minLength = 6) {
        return [
            body(fieldName)
                .isLength({ min: minLength })
                .withMessage(`Password must be at least ${minLength} characters`)
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
                .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
            handleValidationErrors
        ];
    }

    // String validation
    static stringValidation(fieldName, minLength = 1, maxLength = 100, required = true) {
        const validations = [
            body(fieldName)
                .isLength({ min: minLength, max: maxLength })
                .withMessage(`${fieldName} must be between ${minLength} and ${maxLength} characters`)
        ];

        if (required) {
            validations.unshift(
                body(fieldName)
                    .notEmpty()
                    .withMessage(`${fieldName} is required`)
            );
        } else {
            validations.unshift(
                body(fieldName)
                    .optional()
            );
        }

        validations.push(handleValidationErrors);
        return validations;
    }

    // Number validation
    static numberValidation(fieldName, min = null, max = null, required = true) {
        const validations = [
            body(fieldName)
                .isNumeric()
                .withMessage(`${fieldName} must be a number`)
        ];

        if (min !== null) {
            validations.push(
                body(fieldName)
                    .isInt({ min })
                    .withMessage(`${fieldName} must be at least ${min}`)
            );
        }

        if (max !== null) {
            validations.push(
                body(fieldName)
                    .isInt({ max })
                    .withMessage(`${fieldName} must be at most ${max}`)
            );
        }

        if (required) {
            validations.unshift(
                body(fieldName)
                    .notEmpty()
                    .withMessage(`${fieldName} is required`)
            );
        } else {
            validations.unshift(
                body(fieldName)
                    .optional()
            );
        }

        validations.push(handleValidationErrors);
        return validations;
    }

    // Boolean validation
    static booleanValidation(fieldName, required = true) {
        const validations = [
            body(fieldName)
                .isBoolean()
                .withMessage(`${fieldName} must be a boolean value`)
        ];

        if (required) {
            validations.unshift(
                body(fieldName)
                    .notEmpty()
                    .withMessage(`${fieldName} is required`)
            );
        } else {
            validations.unshift(
                body(fieldName)
                    .optional()
            );
        }

        validations.push(handleValidationErrors);
        return validations;
    }

    // Date validation
    static dateValidation(fieldName, required = true) {
        const validations = [
            body(fieldName)
                .isISO8601()
                .withMessage(`${fieldName} must be a valid date`)
        ];

        if (required) {
            validations.unshift(
                body(fieldName)
                    .notEmpty()
                    .withMessage(`${fieldName} is required`)
            );
        } else {
            validations.unshift(
                body(fieldName)
                    .optional()
            );
        }

        validations.push(handleValidationErrors);
        return validations;
    }

    // Array validation
    static arrayValidation(fieldName, required = true) {
        const validations = [
            body(fieldName)
                .isArray()
                .withMessage(`${fieldName} must be an array`)
        ];

        if (required) {
            validations.unshift(
                body(fieldName)
                    .notEmpty()
                    .withMessage(`${fieldName} is required`)
            );
        } else {
            validations.unshift(
                body(fieldName)
                    .optional()
            );
        }

        validations.push(handleValidationErrors);
        return validations;
    }

    // URL validation
    static urlValidation(fieldName, required = true) {
        const validations = [
            body(fieldName)
                .isURL()
                .withMessage(`${fieldName} must be a valid URL`)
        ];

        if (required) {
            validations.unshift(
                body(fieldName)
                    .notEmpty()
                    .withMessage(`${fieldName} is required`)
            );
        } else {
            validations.unshift(
                body(fieldName)
                    .optional()
            );
        }

        validations.push(handleValidationErrors);
        return validations;
    }

    // Custom validation
    static customValidation(fieldName, customValidator, required = true) {
        const validations = [
            body(fieldName)
                .custom(customValidator)
        ];

        if (required) {
            validations.unshift(
                body(fieldName)
                    .notEmpty()
                    .withMessage(`${fieldName} is required`)
            );
        } else {
            validations.unshift(
                body(fieldName)
                    .optional()
            );
        }

        validations.push(handleValidationErrors);
        return validations;
    }

    // Combine multiple validations
    static combine(...validations) {
        return validations.flat();
    }
}

module.exports = BaseValidator; 