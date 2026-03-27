const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    sku: {
      type: String,
    },
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: 'USA',
    },
    phone: {
      type: String,
    },
  },
  { _id: false }
);

const paymentInfoSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
      enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'cod'],
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paidAt: {
      type: Date,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    billingAddress: {
      type: shippingAddressSchema,
    },
    paymentInfo: {
      type: paymentInfoSchema,
      required: true,
    },
    prices: {
      itemsTotal: {
        type: Number,
        required: true,
        min: 0,
      },
      shipping: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      },
      tax: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      },
      discount: {
        type: Number,
        min: 0,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
      ],
      default: 'pending',
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: [
            'pending',
            'confirmed',
            'processing',
            'shipped',
            'delivered',
            'cancelled',
            'refunded',
          ],
        },
        timestamp: { type: Date, default: Date.now },
        note: String,
      },
    ],
    shipping: {
      carrier: {
        type: String,
      },
      trackingNumber: {
        type: String,
      },
      estimatedDelivery: {
        type: Date,
      },
      shippedAt: {
        type: Date,
      },
      deliveredAt: {
        type: Date,
      },
    },
    notes: {
      customer: {
        type: String,
        maxlength: 500,
      },
      internal: {
        type: String,
        maxlength: 1000,
      },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    cancellationReason: {
      type: String,
      maxlength: 500,
    },
    couponCode: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance (orderNumber already has unique index from schema)
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'paymentInfo.status': 1 });
orderSchema.index({ isPaid: 1 });

// Virtual for item count
orderSchema.virtual('itemCount').get(function () {
  return this.items.reduce((acc, item) => acc + item.quantity, 0);
});

// Pre-save middleware to generate order number
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }

  // Add status to history if new or status changed
  if (this.isNew || this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
    });
  }

  // Set paidAt when order is paid
  if (this.isPaid && !this.paidAt) {
    this.paidAt = new Date();
  }

  // Set deliveredAt when order is delivered
  if (this.isDelivered && !this.deliveredAt) {
    this.deliveredAt = new Date();
  }

  next();
});

// Static method to find orders by user
orderSchema.statics.findByUser = function (userId, options = {}) {
  let query = this.find({ user: userId });

  if (options.status) {
    query = query.where('status').equals(options.status);
  }

  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const skip = (page - 1) * limit;

  return query
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('items.product', 'name images');
};

// Static method to get order statistics
orderSchema.statics.getStatistics = async function (userId) {
  const stats = await this.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: '$prices.total' },
        pendingOrders: {
          $sum: {
            $cond: [
              { $in: ['$status', ['pending', 'confirmed', 'processing']] },
              1,
              0,
            ],
          },
        },
        deliveredOrders: {
          $sum: {
            $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0],
          },
        },
      },
    },
  ]);

  return stats[0] || {
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  };
};

// Instance method to cancel order
orderSchema.methods.cancel = function (reason) {
  if (['delivered', 'cancelled', 'refunded'].includes(this.status)) {
    throw new Error('Order cannot be cancelled');
  }
  this.status = 'cancelled';
  this.cancelledAt = new Date();
  this.cancellationReason = reason;
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
