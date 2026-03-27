const { sendError } = require('../utils/responseUtils');

/**
 * Handle Mongoose validation errors
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => ({
    field: el.path,
    message: el.message,
  }));
  return { message: 'Validation Error', errors, statusCode: 400 };
};

/**
 * Handle Mongoose duplicate key errors
 */
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return {
    message: `Duplicate field value: ${field} - ${value}. Please use another value.`,
    errors: [{ field, message: `${field} already exists` }],
    statusCode: 409,
  };
};

/**
 * Handle Mongoose cast errors (invalid ObjectId)
 */
const handleCastError = (err) => {
  return {
    message: `Invalid ${err.path}: ${err.value}`,
    errors: [{ field: err.path, message: `Invalid ${err.path} format` }],
    statusCode: 400,
  };
};

/**
 * Handle JWT errors
 */
const handleJWTError = () => ({
  message: 'Invalid token. Please log in again.',
  statusCode: 401,
});

/**
 * Handle JWT expiration errors
 */
const handleJWTExpiredError = () => ({
  message: 'Your token has expired. Please log in again.',
  statusCode: 401,
});

/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  let error = { ...err };
  error.message = err.message;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  }
  // Mongoose duplicate key error
  else if (err.code === 11000) {
    error = handleDuplicateKeyError(err);
  }
  // Mongoose cast error (invalid ObjectId)
  else if (err.name === 'CastError') {
    error = handleCastError(err);
  }
  // JWT error
  else if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  }
  // JWT expired error
  else if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }

  // Default error response
  const statusCode = error.statusCode || err.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  const errors = error.errors || null;

  // In development, include stack trace
  if (process.env.NODE_ENV === 'development') {
    return sendError(res, message, statusCode, {
      ...(errors && { validationErrors: errors }),
      stack: err.stack,
      ...(err.name && { errorType: err.name }),
    });
  }

  // In production, send clean error
  return sendError(res, message, statusCode, errors);
};

/**
 * 404 Not Found Handler
 */
const notFoundHandler = (req, res, next) => {
  sendError(res, `Route ${req.originalUrl} not found.`, 404);
};

/**
 * Async error wrapper for controllers
 * Catches errors in async functions and passes them to error handler
 */
const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncErrorHandler,
};
