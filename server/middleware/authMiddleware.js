const { verifyAccessToken } = require('../utils/jwtUtils');
const { sendError } = require('../utils/responseUtils');
const { User } = require('../models');

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies (optional)
    else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return sendError(res, 'Access denied. No token provided.', 401);
    }

    try {
      // Verify token
      const decoded = verifyAccessToken(token);

      // Check if user still exists
      const user = await User.findById(decoded.userId);

      if (!user) {
        return sendError(res, 'User not found. Token may be invalid.', 401);
      }

      // Check if user is active
      if (!user.isActive) {
        return sendError(res, 'User account is deactivated.', 403);
      }

      // Check if password was changed after token was issued
      if (user.changedPasswordAfter(decoded.iat)) {
        return sendError(
          res,
          'Password recently changed. Please log in again.',
          401
        );
      }

      // Attach user to request object
      req.user = user;
      req.userId = user._id;
      req.userRole = user.role;

      next();
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return sendError(res, 'Token expired. Please log in again.', 401);
      }
      if (jwtError.name === 'JsonWebTokenError') {
        return sendError(res, 'Invalid token.', 401);
      }
      throw jwtError;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return sendError(res, 'Authentication failed.', 500);
  }
};

/**
 * Optional Authentication Middleware
 * Attaches user to request if token is valid, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token) {
      try {
        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.userId);

        if (user && user.isActive) {
          req.user = user;
          req.userId = user._id;
          req.userRole = user.role;
        }
      } catch (error) {
        // Silently fail for optional auth
        console.log('Optional auth failed:', error.message);
      }
    }

    next();
  } catch (error) {
    next();
  }
};

/**
 * Authorization Middleware - Check if user has required role
 * @param  {...String} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Authentication required.', 401);
    }

    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        'Access denied. Insufficient permissions.',
        403
      );
    }

    next();
  };
};

/**
 * Admin-only Middleware
 */
const adminOnly = authorize('admin');

/**
 * Admin or Moderator Middleware
 */
const adminOrModerator = authorize('admin', 'moderator');

/**
 * Refresh Token Middleware
 * Verifies refresh token and issues new access token
 */
const verifyRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendError(res, 'Refresh token required.', 400);
    }

    try {
      const decoded = verifyAccessToken(refreshToken);
      const user = await User.findById(decoded.userId);

      if (!user || !user.isActive) {
        return sendError(res, 'Invalid refresh token.', 401);
      }

      // Check if refresh token exists in user's token list
      const tokenExists = user.refreshTokens.some(
        (rt) => rt.token === refreshToken
      );

      if (!tokenExists) {
        return sendError(res, 'Invalid refresh token.', 401);
      }

      req.user = user;
      next();
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return sendError(res, 'Refresh token expired. Please log in again.', 401);
      }
      return sendError(res, 'Invalid refresh token.', 401);
    }
  } catch (error) {
    console.error('Refresh token verification error:', error);
    return sendError(res, 'Token verification failed.', 500);
  }
};

module.exports = {
  authenticate,
  optionalAuth,
  authorize,
  adminOnly,
  adminOrModerator,
  verifyRefreshToken,
};
