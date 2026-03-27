const { User } = require('../models');
const { sendSuccess, sendError } = require('../utils/responseUtils');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  sendSuccess(res, 'Profile retrieved successfully', {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    addresses: user.addresses,
    wishlist: user.wishlist,
    createdAt: user.createdAt,
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, avatar } = req.body;

  const user = await User.findById(req.userId);

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  // Update fields
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (avatar) user.avatar = avatar;

  await user.save();

  sendSuccess(res, 'Profile updated successfully', {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
  });
});

/**
 * @desc    Change password
 * @route   PUT /api/users/change-password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.userId).select('+password');

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  // Verify current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return sendError(res, 'Current password is incorrect', 400);
  }

  // Update password
  user.password = newPassword;
  await user.save();

  sendSuccess(res, 'Password changed successfully');
});

/**
 * @desc    Add address
 * @route   POST /api/users/addresses
 * @access  Private
 */
const addAddress = asyncHandler(async (req, res) => {
  const { street, city, state, zipCode, country, phone, label, isDefault } = req.body;

  const user = await User.findById(req.userId);

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  const newAddress = {
    street,
    city,
    state,
    zipCode,
    country: country || 'USA',
    phone,
    label: label || 'home',
    isDefault: isDefault || false,
  };

  // If this is the default address, unset other defaults
  if (newAddress.isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  user.addresses.push(newAddress);
  await user.save();

  sendSuccess(res, 'Address added successfully', { addresses: user.addresses });
});

/**
 * @desc    Update address
 * @route   PUT /api/users/addresses/:addressId
 * @access  Private
 */
const updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const { street, city, state, zipCode, country, phone, label, isDefault } = req.body;

  const user = await User.findById(req.userId);

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  const address = user.addresses.id(addressId);

  if (!address) {
    return sendError(res, 'Address not found', 404);
  }

  // Update fields
  if (street) address.street = street;
  if (city) address.city = city;
  if (state) address.state = state;
  if (zipCode) address.zipCode = zipCode;
  if (country) address.country = country;
  if (phone) address.phone = phone;
  if (label) address.label = label;

  // Handle default address
  if (isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
    address.isDefault = true;
  }

  await user.save();

  sendSuccess(res, 'Address updated successfully', { addresses: user.addresses });
});

/**
 * @desc    Delete address
 * @route   DELETE /api/users/addresses/:addressId
 * @access  Private
 */
const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const user = await User.findById(req.userId);

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  const address = user.addresses.id(addressId);

  if (!address) {
    return sendError(res, 'Address not found', 404);
  }

  address.remove();
  await user.save();

  sendSuccess(res, 'Address deleted successfully', { addresses: user.addresses });
});

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const users = await User.find()
    .select('-password -refreshTokens')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await User.countDocuments();

  sendSuccess(res, 'Users retrieved successfully', {
    users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
    },
  });
});

/**
 * @desc    Get user by ID (Admin only)
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -refreshTokens');

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  sendSuccess(res, 'User retrieved successfully', { user });
});

/**
 * @desc    Update user (Admin only)
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, isActive } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  if (name) user.name = name;
  if (email) user.email = email.toLowerCase();
  if (role) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;

  await user.save();

  sendSuccess(res, 'User updated successfully', {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
  });
});

/**
 * @desc    Delete user (Admin only)
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.userId) {
    return sendError(res, 'Cannot delete your own account', 400);
  }

  await user.deleteOne();

  sendSuccess(res, 'User deleted successfully');
});

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  addAddress,
  updateAddress,
  deleteAddress,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
