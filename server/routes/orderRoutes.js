const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, adminOnly } = require('../middleware');
const {
  validateCreateOrder,
  validatePagination,
} = require('../middleware/validationMiddleware');
const { orderLimiter } = require('../middleware/rateLimiter');

// All order routes require authentication
router.use(authenticate);

// User order routes
router.post('/', orderLimiter, validateCreateOrder, orderController.createOrder);
router.get('/', validatePagination, orderController.getUserOrders);
router.get('/all', adminOnly, validatePagination, orderController.getAllOrders);
router.get('/statistics', adminOnly, orderController.getOrderStatistics);
router.get('/:id', orderController.getOrderById);
router.put('/:id/cancel', orderController.cancelOrder);

// Admin order management routes
router.put('/:id/status', adminOnly, orderController.updateOrderStatus);
router.put('/:id/payment', adminOnly, orderController.updatePaymentStatus);
router.put('/:id/tracking', adminOnly, orderController.addTrackingInfo);

module.exports = router;
