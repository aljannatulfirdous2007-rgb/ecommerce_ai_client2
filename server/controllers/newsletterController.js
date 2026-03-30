const Newsletter = require('../models/Newsletter');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/responseUtils');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
const subscribeToNewsletter = asyncHandler(async (req, res) => {
  const { email, source = 'website' } = req.body;

  if (!email || !email.trim()) {
    return errorResponse(res, 'Email is required', 400);
  }

  const metadata = {
    source,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
  };

  const subscriber = await Newsletter.subscribe(email, metadata);

  successResponse(res, { email: subscriber.email }, 'Successfully subscribed to newsletter', 201);
});

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
const unsubscribeFromNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email || !email.trim()) {
    return errorResponse(res, 'Email is required', 400);
  }

  await Newsletter.unsubscribe(email);

  successResponse(res, null, 'Successfully unsubscribed from newsletter');
});

// @desc    Get all subscribers (Admin only)
// @route   GET /api/newsletter/subscribers
// @access  Private/Admin
const getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Newsletter.getSubscribers();
  
  successResponse(res, { 
    count: subscribers.length,
    subscribers 
  }, 'Subscribers retrieved successfully');
});

module.exports = {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getSubscribers
};
