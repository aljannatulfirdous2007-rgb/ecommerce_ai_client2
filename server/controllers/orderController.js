const { Order, Cart, Product } = require('../models');
const { sendSuccess, sendError, sendPaginated } = require('../utils/responseUtils');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, billingAddress, paymentMethod, notes } = req.body;

  // Get user's cart
  const cart = await Cart.findOne({ user: req.userId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    return sendError(res, 'Your cart is empty', 400);
  }

  // Validate stock availability
  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);
    if (!product || product.inventory < item.quantity) {
      return sendError(
        res,
        `Insufficient stock for ${item.product.name}`,
        400
      );
    }
  }

  // Calculate prices
  const itemsTotal = cart.subtotal;
  const shipping = itemsTotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = Math.round(itemsTotal * 0.08 * 100) / 100; // 8% tax
  const discount = cart.discountAmount || 0;
  const total = Math.round((itemsTotal + shipping + tax - discount) * 100) / 100;

  // Prepare order items
  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    image: item.product.images?.[0]?.url || '',
    price: item.price,
    quantity: item.quantity,
    sku: item.product.sku,
  }));

  // Create order
  const order = await Order.create({
    user: req.userId,
    items: orderItems,
    shippingAddress,
    billingAddress: billingAddress || shippingAddress,
    paymentInfo: {
      method: paymentMethod,
      amount: total,
      status: 'pending',
    },
    prices: {
      itemsTotal,
      shipping,
      tax,
      discount,
      total,
    },
    notes: {
      customer: notes,
    },
    couponCode: cart.couponCode,
  });

  // Update product inventory
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { inventory: -item.quantity },
    });
  }

  // Clear cart
  await cart.clear();

  // Populate and return order
  const populatedOrder = await Order.findById(order._id).populate(
    'items.product',
    'name images'
  );

  sendSuccess(res, 'Order placed successfully', { order: populatedOrder }, 201);
});

/**
 * @desc    Get user orders
 * @route   GET /api/orders
 * @access  Private
 */
const getUserOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    status,
  };

  const orders = await Order.findByUser(req.userId, options);
  const total = await Order.countDocuments({ user: req.userId });

  sendPaginated(
    res,
    'Orders retrieved successfully',
    orders,
    {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
    }
  );
});

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.userId,
  }).populate('items.product', 'name images');

  if (!order) {
    return sendError(res, 'Order not found', 404);
  }

  sendSuccess(res, 'Order retrieved successfully', { order });
});

/**
 * @desc    Get all orders (Admin only)
 * @route   GET /api/orders/all
 * @access  Private/Admin
 */
const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;

  let query = {};
  if (status) {
    query.status = status;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const orders = await Order.find(query)
    .populate('user', 'name email')
    .populate('items.product', 'name images')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Order.countDocuments(query);

  sendPaginated(
    res,
    'All orders retrieved successfully',
    orders,
    {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
    }
  );
});

/**
 * @desc    Update order status (Admin only)
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return sendError(res, 'Order not found', 404);
  }

  // Validate status transition
  const validStatuses = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
  ];

  if (!validStatuses.includes(status)) {
    return sendError(res, 'Invalid status', 400);
  }

  order.status = status;

  // Update specific fields based on status
  if (status === 'delivered') {
    order.isDelivered = true;
    order.deliveredAt = new Date();
  }

  if (status === 'cancelled') {
    // Restore inventory
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { inventory: item.quantity },
      });
    }
  }

  // Add to status history
  order.statusHistory.push({
    status,
    timestamp: new Date(),
    note,
  });

  await order.save();

  sendSuccess(res, 'Order status updated', { order });
});

/**
 * @desc    Update payment status (Admin only)
 * @route   PUT /api/orders/:id/payment
 * @access  Private/Admin
 */
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { status, transactionId } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return sendError(res, 'Order not found', 404);
  }

  order.paymentInfo.status = status;
  if (transactionId) {
    order.paymentInfo.transactionId = transactionId;
  }

  if (status === 'completed') {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentInfo.paidAt = new Date();
  }

  await order.save();

  sendSuccess(res, 'Payment status updated', { order });
});

/**
 * @desc    Add tracking info (Admin only)
 * @route   PUT /api/orders/:id/tracking
 * @access  Private/Admin
 */
const addTrackingInfo = asyncHandler(async (req, res) => {
  const { carrier, trackingNumber, estimatedDelivery } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return sendError(res, 'Order not found', 404);
  }

  order.shipping.carrier = carrier;
  order.shipping.trackingNumber = trackingNumber;
  order.shipping.estimatedDelivery = estimatedDelivery;
  order.shipping.shippedAt = new Date();

  // Update status to shipped if not already
  if (order.status !== 'shipped' && order.status !== 'delivered') {
    order.status = 'shipped';
    order.statusHistory.push({
      status: 'shipped',
      timestamp: new Date(),
      note: `Shipped via ${carrier}`,
    });
  }

  await order.save();

  sendSuccess(res, 'Tracking information added', { order });
});

/**
 * @desc    Cancel order
 * @route   PUT /api/orders/:id/cancel
 * @access  Private
 */
const cancelOrder = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const order = await Order.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  if (!order) {
    return sendError(res, 'Order not found', 404);
  }

  // Check if order can be cancelled
  if (['delivered', 'cancelled', 'refunded'].includes(order.status)) {
    return sendError(res, 'Order cannot be cancelled', 400);
  }

  // Cancel the order
  order.cancel(reason);

  // Restore inventory
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { inventory: item.quantity },
    });
  }

  await order.save();

  sendSuccess(res, 'Order cancelled successfully', { order });
});

/**
 * @desc    Get order statistics (Admin only)
 * @route   GET /api/orders/statistics
 * @access  Private/Admin
 */
const getOrderStatistics = asyncHandler(async (req, res) => {
  const stats = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$prices.total' },
        pendingOrders: {
          $sum: {
            $cond: [
              { $in: ['$status', ['pending', 'confirmed', 'processing']] },
              1,
              0,
            ],
          },
        },
        shippedOrders: {
          $sum: {
            $cond: [{ $eq: ['$status', 'shipped'] }, 1, 0],
          },
        },
        deliveredOrders: {
          $sum: {
            $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0],
          },
        },
        cancelledOrders: {
          $sum: {
            $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0],
          },
        },
      },
    },
  ]);

  const monthlyStats = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        orders: { $sum: 1 },
        revenue: { $sum: '$prices.total' },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 12 },
  ]);

  sendSuccess(res, 'Order statistics retrieved', {
    overview: stats[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
    },
    monthly: monthlyStats,
  });
});

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  addTrackingInfo,
  cancelOrder,
  getOrderStatistics,
};
