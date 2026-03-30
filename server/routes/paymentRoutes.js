const express = require('express');
const router = express.Router();
const { 
  createPaymentIntent, 
  verifyPayment, 
  getStripeConfig 
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Public route for Stripe config
router.get('/config', getStripeConfig);

// Protected routes
router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/verify-payment', protect, verifyPayment);

module.exports = router;
