const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    helpful: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    oldPrice: {
      type: Number,
      min: [0, 'Old price cannot be negative'],
      default: null,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Fashion', 'Tech', 'Beauty', 'Home', 'Sports', 'Books', 'Automotive', 'Jewelry'],
        message: 'Category must be one of: Fashion, Tech, Beauty, Home, Sports, Books, Automotive, Jewelry',
      },
    },
    subcategory: {
      type: String,
      trim: true,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    inventory: {
      type: Number,
      required: [true, 'Inventory count is required'],
      min: [0, 'Inventory cannot be negative'],
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    specifications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [reviewSchema],
    reviewCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    weight: {
      type: Number, // in kg
      min: 0,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    metaKeywords: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isOnSale: 1 });

// Virtual for discount calculation
productSchema.virtual('savings').get(function () {
  if (this.oldPrice && this.oldPrice > this.price) {
    return this.oldPrice - this.price;
  }
  return 0;
});

// Virtual for discount percentage
productSchema.virtual('discountPercent').get(function () {
  if (this.oldPrice && this.oldPrice > this.price) {
    return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
  }
  return 0;
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function () {
  const primary = this.images.find((img) => img.isPrimary);
  return primary ? primary.url : this.images.length > 0 ? this.images[0].url : null;
});

// Virtual for average rating calculation
productSchema.virtual('averageRating').get(function () {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10;
});

// Pre-save middleware to update review count and rating
productSchema.pre('save', function (next) {
  if (this.reviews && this.reviews.length > 0) {
    this.reviewCount = this.reviews.length;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = Math.round((sum / this.reviews.length) * 10) / 10;
  }
  next();
});

// Static method to find featured products
productSchema.statics.findFeatured = function (limit = 10) {
  return this.find({ isActive: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to find products on sale
productSchema.statics.findOnSale = function (limit = 10) {
  return this.find({ isActive: true, isOnSale: true })
    .sort({ discountPercentage: -1 })
    .limit(limit);
};

// Static method to search products
productSchema.statics.search = function (query, options = {}) {
  const searchQuery = {
    $text: { $search: query },
    isActive: true,
  };

  return this.find(searchQuery, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .limit(options.limit || 20);
};

// Static method to get products by category
productSchema.statics.findByCategory = function (category, options = {}) {
  const query = { isActive: true };
  if (category && category !== 'All') {
    query.category = category;
  }

  let builder = this.find(query);

  // Sorting
  if (options.sort) {
    const sortOptions = {
      price_low: { price: 1 },
      price_high: { price: -1 },
      rating: { rating: -1 },
      newest: { createdAt: -1 },
      popularity: { reviewCount: -1 },
    };
    builder = builder.sort(sortOptions[options.sort] || { createdAt: -1 });
  }

  // Pagination
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 20;
  const skip = (page - 1) * limit;

  return builder.skip(skip).limit(limit);
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
