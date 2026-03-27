const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1'],
      max: [99, 'Quantity cannot exceed 99'],
      default: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One cart per user
    },
    items: [cartItemSchema],
    couponCode: {
      type: String,
      default: null,
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance (user already has unique index from schema)
cartSchema.index({ lastActivity: 1 });

// Virtual for total items count
cartSchema.virtual('itemCount').get(function () {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for subtotal (before discount)
cartSchema.virtual('subtotal').get(function () {
  return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Virtual for total (after discount)
cartSchema.virtual('total').get(function () {
  const subtotal = this.subtotal;
  return Math.max(0, subtotal - this.discountAmount);
});

// Pre-save middleware to update lastActivity
cartSchema.pre('save', function (next) {
  this.lastActivity = new Date();
  next();
});

// Instance method to add item to cart
cartSchema.methods.addItem = async function (productId, quantity, price) {
  const existingItemIndex = this.items.findIndex(
    (item) => item.product.toString() === productId.toString()
  );

  if (existingItemIndex >= 0) {
    // Update existing item
    this.items[existingItemIndex].quantity += quantity;
    // Ensure quantity doesn't exceed max
    if (this.items[existingItemIndex].quantity > 99) {
      this.items[existingItemIndex].quantity = 99;
    }
  } else {
    // Add new item
    this.items.push({
      product: productId,
      quantity,
      price,
      addedAt: new Date(),
    });
  }

  return this.save();
};

// Instance method to update item quantity
cartSchema.methods.updateItemQuantity = async function (productId, quantity) {
  const itemIndex = this.items.findIndex(
    (item) => item.product.toString() === productId.toString()
  );

  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    this.items.splice(itemIndex, 1);
  } else {
    this.items[itemIndex].quantity = Math.min(quantity, 99);
  }

  return this.save();
};

// Instance method to remove item from cart
cartSchema.methods.removeItem = async function (productId) {
  this.items = this.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );
  return this.save();
};

// Instance method to clear cart
cartSchema.methods.clear = async function () {
  this.items = [];
  this.couponCode = null;
  this.discountAmount = 0;
  return this.save();
};

// Instance method to apply coupon
cartSchema.methods.applyCoupon = async function (couponCode, discountAmount) {
  this.couponCode = couponCode;
  this.discountAmount = discountAmount;
  return this.save();
};

// Instance method to remove coupon
cartSchema.methods.removeCoupon = async function () {
  this.couponCode = null;
  this.discountAmount = 0;
  return this.save();
};

// Static method to find or create cart
cartSchema.statics.findOrCreate = async function (userId) {
  let cart = await this.findOne({ user: userId });

  if (!cart) {
    cart = await this.create({ user: userId, items: [] });
  }

  return cart;
};

// Static method to merge guest cart with user cart
cartSchema.statics.mergeCarts = async function (userId, guestItems) {
  let cart = await this.findOrCreate(userId);

  for (const item of guestItems) {
    await cart.addItem(item.product, item.quantity, item.price);
  }

  return cart;
};

// Static method to clean up old carts (for scheduled cleanup tasks)
cartSchema.statics.cleanupOldCarts = async function (daysOld = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  const result = await this.deleteMany({
    lastActivity: { $lt: cutoffDate },
    'items.0': { $exists: false }, // Empty carts only
  });

  return result;
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
