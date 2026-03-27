const { User } = require('../models');
const { generateTokenPair } = require('../utils/jwtUtils');
const { sendSuccess, sendError } = require('../utils/responseUtils');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    return sendError(res, 'User already exists with this email', 409);
  }

  // Create new user
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
  });

  // Generate tokens
  const tokens = generateTokenPair(user);

  // Add refresh token to user
  const refreshTokenExpiry = new Date();
  refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);
  user.addRefreshToken(tokens.refreshToken, refreshTokenExpiry);
  await user.save();

  sendSuccess(
    res,
    'User registered successfully',
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      tokens,
    },
    201
  );
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user with password
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    return sendError(res, 'Invalid email or password', 401);
  }

  // Check if user is active
  if (!user.isActive) {
    return sendError(res, 'Your account has been deactivated', 403);
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return sendError(res, 'Invalid email or password', 401);
  }

  // Update last login
  user.lastLogin = new Date();

  // Generate tokens
  const tokens = generateTokenPair(user);

  // Add refresh token to user
  const refreshTokenExpiry = new Date();
  refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);
  user.addRefreshToken(tokens.refreshToken, refreshTokenExpiry);
  await user.save();

  sendSuccess(res, 'Login successful', {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    tokens,
  });
});

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public (with refresh token)
 */
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return sendError(res, 'Refresh token is required', 400);
  }

  try {
    const { verifyRefreshToken, generateAccessToken } = require('../utils/jwtUtils');
    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return sendError(res, 'Invalid refresh token', 401);
    }

    // Check if refresh token exists in user's token list
    const tokenExists = user.refreshTokens.some((rt) => rt.token === refreshToken);
    if (!tokenExists) {
      return sendError(res, 'Invalid refresh token', 401);
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    sendSuccess(res, 'Token refreshed successfully', { accessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 'Refresh token expired. Please log in again.', 401);
    }
    return sendError(res, 'Invalid refresh token', 401);
  }
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const user = await User.findById(req.userId);

  if (user && refreshToken) {
    user.removeRefreshToken(refreshToken);
    await user.save();
  }

  sendSuccess(res, 'Logged out successfully');
});

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  sendSuccess(res, 'User retrieved successfully', {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    addresses: user.addresses,
    createdAt: user.createdAt,
  });
});

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
};
