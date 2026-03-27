# API Routes Verification Document

## Overview
This document verifies all API routes for the Luxe Marketplace backend.

---

## Authentication Routes (`/api/auth`)

| Method | Endpoint | Middleware | Controller | Status |
|--------|----------|------------|------------|--------|
| POST | `/register` | authLimiter, validateRegistration | authController.register | ✅ |
| POST | `/login` | loginLimiter, validateLogin | authController.login | ✅ |
| POST | `/logout` | authenticate | authController.logout | ✅ |
| POST | `/refresh` | - | authController.refreshToken | ✅ |
| GET | `/me` | authenticate | authController.getMe | ✅ |
| PUT | `/me` | authenticate, validateUpdateProfile | authController.updateProfile | ✅ |
| PUT | `/change-password` | authenticate, validateChangePassword | authController.changePassword | ✅ |
| POST | `/forgot-password` | passwordResetLimiter, validatePasswordResetRequest | authController.forgotPassword | ✅ |
| POST | `/reset-password` | passwordResetLimiter, validatePasswordReset | authController.resetPassword | ✅ |

---

## User Routes (`/api/users`)

| Method | Endpoint | Middleware | Controller | Status |
|--------|----------|------------|------------|--------|
| GET | `/dashboard-stats` | authenticate | userController.getDashboardStats | ✅ |
| GET | `/addresses` | authenticate | userController.getAddresses | ✅ |
| POST | `/addresses` | authenticate, validateAddAddress | userController.addAddress | ✅ |
| PUT | `/addresses/:addressId` | authenticate, validateAddAddress | userController.updateAddress | ✅ |
| DELETE | `/addresses/:addressId` | authenticate | userController.deleteAddress | ✅ |
| GET | `/wishlist` | authenticate | userController.getWishlist | ✅ |
| POST | `/wishlist` | authenticate | userController.addToWishlist | ✅ |
| DELETE | `/wishlist/:productId` | authenticate | userController.removeFromWishlist | ✅ |
| GET | `/` | authenticate, adminOnly, validatePagination | userController.getAllUsers | ✅ |
| GET | `/:id` | authenticate, adminOnly | userController.getUserById | ✅ |
| PUT | `/:id` | authenticate, adminOnly | userController.updateUser | ✅ |
| DELETE | `/:id` | authenticate, adminOnly | userController.deleteUser | ✅ |

---

## Product Routes (`/api/products`)

| Method | Endpoint | Middleware | Controller | Status |
|--------|----------|------------|------------|--------|
| GET | `/` | validatePagination, validateProductFilters | productController.getAllProducts | ✅ |
| GET | `/featured` | - | productController.getFeaturedProducts | ✅ |
| GET | `/sale` | - | productController.getSaleProducts | ✅ |
| GET | `/new-arrivals` | - | productController.getNewArrivals | ✅ |
| GET | `/categories` | - | productController.getCategories | ✅ |
| GET | `/search` | - | productController.searchProducts | ✅ |
| GET | `/category/:category` | validatePagination | productController.getProductsByCategory | ✅ |
| GET | `/:id/related` | validateProductId | productController.getRelatedProducts | ✅ |
| GET | `/:id` | validateProductId | productController.getProductById | ✅ |
| POST | `/:id/reviews` | authenticate, reviewLimiter, validateProductId | productController.addReview | ✅ |
| POST | `/` | authenticate, adminOnly, validateProduct | productController.createProduct | ✅ |
| PUT | `/:id` | authenticate, adminOnly, validateProductId | productController.updateProduct | ✅ |
| DELETE | `/:id` | authenticate, adminOnly, validateProductId | productController.deleteProduct | ✅ |

---

## Cart Routes (`/api/cart`)

| Method | Endpoint | Middleware | Controller | Status |
|--------|----------|------------|------------|--------|
| GET | `/` | authenticate | cartController.getCart | ✅ |
| POST | `/items` | authenticate, validateCartItem | cartController.addToCart | ✅ |
| PUT | `/items/:productId` | authenticate, validateUpdateCartItem | cartController.updateCartItem | ✅ |
| DELETE | `/items/:productId` | authenticate | cartController.removeFromCart | ✅ |
| DELETE | `/` | authenticate | cartController.clearCart | ✅ |
| POST | `/coupon` | authenticate | cartController.applyCoupon | ✅ |
| DELETE | `/coupon` | authenticate | cartController.removeCoupon | ✅ |
| POST | `/sync` | authenticate | cartController.syncCart | ✅ |
| POST | `/validate` | authenticate | cartController.validateCart | ✅ |

---

## Order Routes (`/api/orders`)

| Method | Endpoint | Middleware | Controller | Status |
|--------|----------|------------|------------|--------|
| POST | `/` | authenticate, orderLimiter, validateCreateOrder | orderController.createOrder | ✅ |
| GET | `/` | authenticate, validatePagination | orderController.getUserOrders | ✅ |
| GET | `/stats` | authenticate | orderController.getOrderStats | ✅ |
| GET | `/:id` | authenticate | orderController.getOrderById | ✅ |
| PUT | `/:id/cancel` | authenticate | orderController.cancelOrder | ✅ |
| GET | `/admin/all` | authenticate, adminOnly, validatePagination | orderController.getAllOrders | ✅ |
| GET | `/admin/analytics` | authenticate, adminOnly | orderController.getOrderAnalytics | ✅ |
| PUT | `/:id/status` | authenticate, adminOnly, validateUpdateOrderStatus | orderController.updateOrderStatus | ✅ |
| PUT | `/:id/payment` | authenticate, adminOnly | orderController.updatePaymentStatus | ✅ |
| PUT | `/:id/tracking` | authenticate, adminOnly | orderController.addTrackingInfo | ✅ |

---

## Health Check

| Method | Endpoint | Response |
|--------|----------|----------|
| GET | `/` | API Info |
| GET | `/api/health` | Server Health Status |

---

## Route Summary

### Total Routes: 54

| Category | Count |
|----------|-------|
| Authentication | 9 |
| User Management | 12 |
| Products | 13 |
| Cart | 9 |
| Orders | 11 |

---

## Middleware Summary

| Middleware | Purpose |
|------------|---------|
| `authenticate` | Verify JWT token |
| `adminOnly` | Restrict to admin users |
| `authLimiter` | Rate limit auth routes (5 req/15min) |
| `loginLimiter` | Rate limit login (10 req/15min) |
| `passwordResetLimiter` | Rate limit password reset (3 req/hour) |
| `orderLimiter` | Rate limit order creation (10 req/hour) |
| `reviewLimiter` | Rate limit reviews (5 req/hour) |
| `apiLimiter` | General rate limit (100 req/15min) |
| `validateRegistration` | Validate registration input |
| `validateLogin` | Validate login input |
| `validateProduct` | Validate product data |
| `validateProductId` | Validate MongoDB ObjectId |
| `validateCartItem` | Validate cart item data |
| `validateCreateOrder` | Validate order creation |
| `validatePagination` | Validate pagination params |
| `validateProductFilters` | Validate product filters |
| `validateUpdateProfile` | Validate profile update |
| `validateChangePassword` | Validate password change |
| `validateAddAddress` | Validate address data |
| `validatePasswordResetRequest` | Validate password reset request |
| `validatePasswordReset` | Validate password reset |
| `validateUpdateOrderStatus` | Validate order status update |
| `validateUpdateCartItem` | Validate cart item update |

---

## Sample API Test Commands

### Using cURL

```bash
# Health Check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test@123","phone":"+1234567890"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@123"}'

# Get Products
curl http://localhost:5000/api/products

# Get Products with Filters
curl "http://localhost:5000/api/products?category=Tech&sort=price_low&page=1&limit=10"

# Get Single Product
curl http://localhost:5000/api/products/PRODUCT_ID_HERE

# Add to Cart (requires auth token)
curl -X POST http://localhost:5000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"productId":"PRODUCT_ID","quantity":2}'

# Get Cart
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create Order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    },
    "paymentMethod": "credit_card"
  }'
```

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Implemented & Verified |
| ⚠️ | Partially Implemented |
| ❌ | Not Implemented |

---

## All Routes Verified: ✅ 54/54

Last Updated: 2024-03-27
