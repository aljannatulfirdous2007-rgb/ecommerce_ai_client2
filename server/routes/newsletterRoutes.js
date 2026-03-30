const express = require('express');
const router = express.Router();
const { 
  subscribeToNewsletter, 
  unsubscribeFromNewsletter,
  getSubscribers 
} = require('../controllers/newsletterController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/subscribe', subscribeToNewsletter);
router.post('/unsubscribe', unsubscribeFromNewsletter);

// Admin route
router.get('/subscribers', protect, admin, getSubscribers);

module.exports = router;
