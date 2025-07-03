// Validator index file
const userValidators = require('./userValidators');
const totpValidators = require('./totpValidators');
const commonValidators = require('./commonValidators');

module.exports = {
    ...userValidators,
    ...totpValidators,
    ...commonValidators
}; 