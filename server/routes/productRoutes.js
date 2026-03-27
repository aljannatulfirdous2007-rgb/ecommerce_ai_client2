const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, adminOnly } = require('../middleware');
const {
  validateProduct,
  validateProductId,
  validatePagination,
  validateProductFilters,
} = require('../middleware/validationMiddleware');

// Public routes
router.get('/', validatePagination, validateProductFilters, productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/sale', productController.getSaleProducts);
router.get('/search', productController.searchProducts);
router.get('/category/:category', validatePagination, productController.getProductsByCategory);
router.get('/:id', validateProductId, productController.getProductById);

// Protected routes (Admin only)
router.post('/', authenticate, adminOnly, validateProduct, productController.createProduct);
router.put('/:id', authenticate, adminOnly, validateProductId, productController.updateProduct);
router.delete('/:id', authenticate, adminOnly, validateProductId, productController.deleteProduct);

// Review routes (authenticated users)
router.post('/:id/reviews', authenticate, validateProductId, productController.addReview);

module.exports = router;
