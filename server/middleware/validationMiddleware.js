const { body, param, query, validationResult } = require('express-validator');
const { sendError } = require('../utils/responseUtils');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value,
    }));

    return sendError(res, 'Validation failed', 400, formattedErrors);
  }

  next();
};

/**
 * User Registration Validation
 */
const validateRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

  body('phone')
    .optional()
    .trim()
    .matches(/^\+?[\d\s\-\(\)]{10,}$/)
    .withMessage('Please provide a valid phone number'),

  handleValidationErrors,
];

/**
 * User Login Validation
 */
const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  handleValidationErrors,
];

/**
 * Password Reset Request Validation
 */
const validatePasswordResetRequest = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  handleValidationErrors,
];

/**
 * Password Reset Validation
 */
const validatePasswordReset = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),

  body('password')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  handleValidationErrors,
];

/**
 * Update Profile Validation
 */
const validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('phone')
    .optional()
    .trim()
    .matches(/^\+?[\d\s\-\(\)]{10,}$/)
    .withMessage('Please provide a valid phone number'),

  handleValidationErrors,
];

/**
 * Change Password Validation
 */
const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),

  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('New password must be different from current password');
      }
      return true;
    }),

  handleValidationErrors,
];

/**
 * Add Address Validation
 */
const validateAddAddress = [
  body('street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),

  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),

  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),

  body('zipCode')
    .trim()
    .notEmpty()
    .withMessage('ZIP code is required'),

  body('country')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Country cannot be empty'),

  body('label')
    .optional()
    .isIn(['home', 'work', 'other'])
    .withMessage('Label must be one of: home, work, other'),

  handleValidationErrors,
];

/**
 * Product Creation/Update Validation
 */
const validateProduct = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 200 })
    .withMessage('Product name cannot exceed 200 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Fashion', 'Tech', 'Beauty', 'Home', 'Sports', 'Books', 'Automotive', 'Jewelry'])
    .withMessage('Invalid category'),

  body('inventory')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Inventory must be a non-negative integer'),

  handleValidationErrors,
];

/**
 * Product ID Parameter Validation
 */
const validateProductId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid product ID format'),

  handleValidationErrors,
];

/**
 * Cart Item Validation
 */
const validateCartItem = [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Invalid product ID format'),

  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1, max: 99 })
    .withMessage('Quantity must be between 1 and 99'),

  handleValidationErrors,
];

/**
 * Update Cart Item Validation
 */
const validateUpdateCartItem = [
  param('productId')
    .isMongoId()
    .withMessage('Invalid product ID format'),

  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 0, max: 99 })
    .withMessage('Quantity must be between 0 and 99'),

  handleValidationErrors,
];

/**
 * Order Creation Validation
 */
const validateCreateOrder = [
  body('shippingAddress')
    .isObject()
    .withMessage('Shipping address is required'),

  body('shippingAddress.street')
    .notEmpty()
    .withMessage('Street address is required'),

  body('shippingAddress.city')
    .notEmpty()
    .withMessage('City is required'),

  body('shippingAddress.state')
    .notEmpty()
    .withMessage('State is required'),

  body('shippingAddress.zipCode')
    .notEmpty()
    .withMessage('ZIP code is required'),

  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['credit_card', 'debit_card', 'paypal', 'stripe', 'cod'])
    .withMessage('Invalid payment method'),

  handleValidationErrors,
];

/**
 * Order Status Update Validation (Admin)
 */
const validateUpdateOrderStatus = [
  param('id')
    .isMongoId()
    .withMessage('Invalid order ID format'),

  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Invalid status'),

  handleValidationErrors,
];

/**
 * Pagination Query Validation
 */
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  handleValidationErrors,
];

/**
 * Product Search/Filters Validation
 */
const validateProductFilters = [
  query('category')
    .optional()
    .isIn(['All', 'Fashion', 'Tech', 'Beauty', 'Home', 'Sports', 'Books', 'Automotive', 'Jewelry'])
    .withMessage('Invalid category'),

  query('sort')
    .optional()
    .isIn(['price_low', 'price_high', 'rating', 'newest', 'popularity'])
    .withMessage('Invalid sort option'),

  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Min price must be a positive number'),

  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Max price must be a positive number'),

  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),

  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateRegistration,
  validateLogin,
  validatePasswordResetRequest,
  validatePasswordReset,
  validateUpdateProfile,
  validateChangePassword,
  validateAddAddress,
  validateProduct,
  validateProductId,
  validateCartItem,
  validateUpdateCartItem,
  validateCreateOrder,
  validateUpdateOrderStatus,
  validatePagination,
  validateProductFilters,
};
