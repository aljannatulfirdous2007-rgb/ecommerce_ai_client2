const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/responseUtils');

// @desc    Create payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, orderId } = req.body;

  if (!amount || amount <= 0) {
    return errorResponse(res, 'Invalid amount', 400);
  }

  // Create Payment Intent with Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    metadata: {
      orderId: orderId.toString(),
      userId: req.user._id.toString()
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  successResponse(res, {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id
  }, 'Payment intent created successfully');
});

// @desc    Verify payment
// @route   POST /api/payment/verify-payment
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  // Retrieve the PaymentIntent from Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== 'succeeded') {
    return errorResponse(res, 'Payment not successful', 400);
  }

  // Update order status to paid
  const order = await Order.findByIdAndUpdate(
    orderId,
    { 
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        email_address: paymentIntent.receipt_email,
      }
    },
    { new: true }
  );

  if (!order) {
    return errorResponse(res, 'Order not found', 404);
  }

  // Clear user's cart
  await Cart.findOneAndDelete({ user: req.user._id });

  successResponse(res, order, 'Payment verified successfully');
});

// @desc    Get Stripe publishable key
// @route   GET /api/payment/config
// @access  Public
const getStripeConfig = asyncHandler(async (req, res) => {
  successResponse(res, {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  }, 'Stripe configuration retrieved');
});

module.exports = {
  createPaymentIntent,
  verifyPayment,
  getStripeConfig
};
