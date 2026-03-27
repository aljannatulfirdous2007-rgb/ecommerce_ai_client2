const { Product } = require('../models');
const { sendSuccess, sendError, sendPaginated } = require('../utils/responseUtils');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, category, sort, minPrice, maxPrice, search } = req.query;

  // Build query
  const query = { isActive: true };

  if (category && category !== 'All') {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  if (search) {
    query.$text = { $search: search };
  }

  // Build sort options
  let sortOption = {};
  if (sort) {
    const sortOptions = {
      price_low: { price: 1 },
      price_high: { price: -1 },
      rating: { rating: -1 },
      newest: { createdAt: -1 },
      popularity: { reviewCount: -1 },
    };
    sortOption = sortOptions[sort] || { createdAt: -1 };
  } else {
    sortOption = { createdAt: -1 };
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Execute query
  let productsQuery = Product.find(query).sort(sortOption).skip(skip).limit(parseInt(limit));

  // If text search, add score
  if (search) {
    productsQuery = productsQuery.select({ score: { $meta: 'textScore' } });
  }

  const products = await productsQuery;
  const total = await Product.countDocuments(query);

  sendPaginated(
    res,
    'Products retrieved successfully',
    products,
    {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
    }
  );
});

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return sendError(res, 'Product not found', 404);
  }

  sendSuccess(res, 'Product retrieved successfully', { product });
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    oldPrice,
    category,
    subcategory,
    inventory,
    images,
    brand,
    tags,
    specifications,
    sku,
    weight,
    dimensions,
    isFeatured,
    isOnSale,
    discountPercentage,
    seoTitle,
    seoDescription,
  } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    oldPrice,
    category,
    subcategory,
    inventory: inventory || 0,
    images: images || [],
    brand,
    tags: tags || [],
    specifications: specifications || [],
    sku,
    weight,
    dimensions,
    isFeatured: isFeatured || false,
    isOnSale: isOnSale || false,
    discountPercentage: discountPercentage || 0,
    seoTitle,
    seoDescription,
  });

  sendSuccess(res, 'Product created successfully', { product }, 201);
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return sendError(res, 'Product not found', 404);
  }

  const updateFields = [
    'name',
    'description',
    'price',
    'oldPrice',
    'category',
    'subcategory',
    'inventory',
    'images',
    'brand',
    'tags',
    'specifications',
    'sku',
    'weight',
    'dimensions',
    'isActive',
    'isFeatured',
    'isOnSale',
    'discountPercentage',
    'seoTitle',
    'seoDescription',
  ];

  updateFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  await product.save();

  sendSuccess(res, 'Product updated successfully', { product });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return sendError(res, 'Product not found', 404);
  }

  // Soft delete - set isActive to false instead of actually deleting
  product.isActive = false;
  await product.save();

  sendSuccess(res, 'Product deleted successfully');
});

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const products = await Product.findFeatured(parseInt(limit));

  sendSuccess(res, 'Featured products retrieved successfully', { products });
});

/**
 * @desc    Get products on sale
 * @route   GET /api/products/sale
 * @access  Public
 */
const getSaleProducts = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const products = await Product.findOnSale(parseInt(limit));

  sendSuccess(res, 'Sale products retrieved successfully', { products });
});

/**
 * @desc    Search products
 * @route   GET /api/products/search
 * @access  Public
 */
const searchProducts = asyncHandler(async (req, res) => {
  const { q, limit = 20 } = req.query;

  if (!q) {
    return sendError(res, 'Search query is required', 400);
  }

  const products = await Product.search(q, { limit: parseInt(limit) });

  sendSuccess(res, 'Search results retrieved successfully', { products, query: q });
});

/**
 * @desc    Get products by category
 * @route   GET /api/products/category/:category
 * @access  Public
 */
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 20, sort } = req.query;

  const products = await Product.findByCategory(category, {
    page: parseInt(page),
    limit: parseInt(limit),
    sort,
  });

  const total = await Product.countDocuments({ category, isActive: true });

  sendPaginated(
    res,
    'Products retrieved successfully',
    products,
    {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
    }
  );
});

/**
 * @desc    Add product review
 * @route   POST /api/products/:id/reviews
 * @access  Private
 */
const addReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return sendError(res, 'Product not found', 404);
  }

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.userId
  );

  if (alreadyReviewed) {
    return sendError(res, 'You have already reviewed this product', 400);
  }

  const review = {
    user: req.userId,
    rating: Number(rating),
    title,
    comment,
  };

  product.reviews.push(review);
  await product.save();

  sendSuccess(res, 'Review added successfully', { product });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getSaleProducts,
  searchProducts,
  getProductsByCategory,
  addReview,
};
