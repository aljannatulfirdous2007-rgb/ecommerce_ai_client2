const { Cart, Product } = require('../models');
const { sendSuccess, sendError } = require('../utils/responseUtils');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get user cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate(
    'items.product',
    'name images price inventory'
  );

  if (!cart) {
    return sendSuccess(res, 'Cart retrieved successfully', {
      items: [],
      itemCount: 0,
      subtotal: 0,
      total: 0,
    });
  }

  sendSuccess(res, 'Cart retrieved successfully', { cart });
});

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  // Validate product
  const product = await Product.findById(productId);
  if (!product) {
    return sendError(res, 'Product not found', 404);
  }

  if (!product.isActive) {
    return sendError(res, 'Product is not available', 400);
  }

  if (product.inventory < quantity) {
    return sendError(res, 'Insufficient stock', 400);
  }

  // Find or create cart
  let cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    cart = new Cart({
      user: req.userId,
      items: [],
    });
  }

  // Check if item already in cart
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    // Update quantity
    cart.items[itemIndex].quantity += parseInt(quantity);
    // Ensure quantity doesn't exceed max
    if (cart.items[itemIndex].quantity > 99) {
      cart.items[itemIndex].quantity = 99;
    }
    // Ensure quantity doesn't exceed inventory
    if (cart.items[itemIndex].quantity > product.inventory) {
      cart.items[itemIndex].quantity = product.inventory;
    }
  } else {
    // Add new item
    cart.items.push({
      product: productId,
      quantity: parseInt(quantity),
      price: product.price,
    });
  }

  await cart.save();

  // Populate and return updated cart
  const populatedCart = await Cart.findById(cart._id).populate(
    'items.product',
    'name images price inventory'
  );

  sendSuccess(res, 'Item added to cart', { cart: populatedCart });
});

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/:productId
 * @access  Private
 */
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return sendError(res, 'Cart not found', 404);
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return sendError(res, 'Item not found in cart', 404);
  }

  if (quantity <= 0) {
    // Remove item
    cart.items.splice(itemIndex, 1);
  } else {
    // Check product inventory
    const product = await Product.findById(productId);
    if (product && quantity > product.inventory) {
      return sendError(res, 'Insufficient stock', 400);
    }

    cart.items[itemIndex].quantity = Math.min(parseInt(quantity), 99);
  }

  await cart.save();

  const populatedCart = await Cart.findById(cart._id).populate(
    'items.product',
    'name images price inventory'
  );

  sendSuccess(res, 'Cart updated', { cart: populatedCart });
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return sendError(res, 'Cart not found', 404);
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  const populatedCart = await Cart.findById(cart._id).populate(
    'items.product',
    'name images price inventory'
  );

  sendSuccess(res, 'Item removed from cart', { cart: populatedCart });
});

/**
 * @desc    Clear cart
 * @route   DELETE /api/cart
 * @access  Private
 */
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });

  if (cart) {
    cart.items = [];
    cart.couponCode = null;
    cart.discountAmount = 0;
    await cart.save();
  }

  sendSuccess(res, 'Cart cleared successfully');
});

/**
 * @desc    Apply coupon to cart
 * @route   POST /api/cart/coupon
 * @access  Private
 */
const applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode } = req.body;

  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return sendError(res, 'Cart not found', 404);
  }

  // Simple coupon validation (you can expand this)
  const validCoupons = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    WELCOME: 0.15,
  };

  const discountRate = validCoupons[couponCode.toUpperCase()];

  if (!discountRate) {
    return sendError(res, 'Invalid coupon code', 400);
  }

  const subtotal = cart.subtotal;
  const discountAmount = Math.round(subtotal * discountRate * 100) / 100;

  cart.couponCode = couponCode.toUpperCase();
  cart.discountAmount = discountAmount;
  await cart.save();

  const populatedCart = await Cart.findById(cart._id).populate(
    'items.product',
    'name images price inventory'
  );

  sendSuccess(res, 'Coupon applied successfully', { cart: populatedCart });
});

/**
 * @desc    Remove coupon from cart
 * @route   DELETE /api/cart/coupon
 * @access  Private
 */
const removeCoupon = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return sendError(res, 'Cart not found', 404);
  }

  cart.couponCode = null;
  cart.discountAmount = 0;
  await cart.save();

  const populatedCart = await Cart.findById(cart._id).populate(
    'items.product',
    'name images price inventory'
  );

  sendSuccess(res, 'Coupon removed', { cart: populatedCart });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
};
