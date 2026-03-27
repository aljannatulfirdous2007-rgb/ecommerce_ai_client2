const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware');
const {
  validateCartItem,
  validateUpdateCartItem,
} = require('../middleware/validationMiddleware');

// All cart routes require authentication
router.use(authenticate);

router.get('/', cartController.getCart);
router.post('/', validateCartItem, cartController.addToCart);
router.put('/:productId', validateUpdateCartItem, cartController.updateCartItem);
router.delete('/:productId', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

// Coupon routes
router.post('/coupon', cartController.applyCoupon);
router.delete('/coupon', cartController.removeCoupon);

module.exports = router;
