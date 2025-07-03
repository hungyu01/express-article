const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation,
    passwordConfirmationValidation
} = require('../validators/userValidators');

// User routes
router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);

// Routes that require authentication
router.use(authenticate); // all routes below require authentication

router.post('/logout', userController.logout);
router.get('/profile', userController.getProfile);
router.put('/profile', updateProfileValidation, userController.updateProfile);
router.put('/password', changePasswordValidation, userController.changePassword);



// Account management
router.delete('/account', passwordConfirmationValidation, userController.deleteAccount);

module.exports = router; 