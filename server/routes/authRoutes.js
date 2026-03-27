const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware');
const {
  validateRegistration,
  validateLogin,
} = require('../middleware/validationMiddleware');
const { authLimiter, loginLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post('/register', authLimiter, validateRegistration, authController.register);
router.post('/login', loginLimiter, validateLogin, authController.login);
router.post('/refresh', authController.refreshToken);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
