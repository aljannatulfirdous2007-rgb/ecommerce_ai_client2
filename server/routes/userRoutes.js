const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, adminOnly } = require('../middleware');
const {
  validateUpdateProfile,
  validateChangePassword,
  validateAddAddress,
  validatePagination,
} = require('../middleware/validationMiddleware');

// Profile routes (authenticated users)
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, validateUpdateProfile, userController.updateProfile);
router.put('/change-password', authenticate, validateChangePassword, userController.changePassword);

// Address routes
router.post('/addresses', authenticate, validateAddAddress, userController.addAddress);
router.put('/addresses/:addressId', authenticate, userController.updateAddress);
router.delete('/addresses/:addressId', authenticate, userController.deleteAddress);

// Admin routes
router.get('/', authenticate, adminOnly, validatePagination, userController.getAllUsers);
router.get('/:id', authenticate, adminOnly, userController.getUserById);
router.put('/:id', authenticate, adminOnly, userController.updateUser);
router.delete('/:id', authenticate, adminOnly, userController.deleteUser);

module.exports = router;
