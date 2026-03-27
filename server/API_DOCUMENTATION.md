# Luxe Marketplace API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_access_token>
```

---

## Authentication Endpoints

### Register
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "+1234567890"
}
```

### Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Get Profile
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/auth/me
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+0987654321"
}
```

### Refresh Token
```http
POST /api/auth/refresh
```
**Request Body:**
```json
{
  "refreshToken": "<refresh_token>"
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

---

## Product Endpoints

### Get All Products
```http
GET /api/products?page=1&limit=20&category=Tech&sort=price_low
```
**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `category` - Filter by category
- `sort` - Sort by: `price_low`, `price_high`, `rating`, `newest`, `popularity`
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `search` - Search query

### Get Single Product
```http
GET /api/products/:id
```

### Get Featured Products
```http
GET /api/products/featured?limit=8
```

### Get Sale Products
```http
GET /api/products/sale?limit=8
```

### Search Products
```http
GET /api/products/search?q=watch&limit=20
```

### Get Categories
```http
GET /api/products/categories
```

### Add Review (Authenticated)
```http
POST /api/products/:id/reviews
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "rating": 5,
  "title": "Great product!",
  "comment": "Really love this item, highly recommend!"
}
```

---

## Cart Endpoints (Authenticated)

### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

### Add to Cart
```http
POST /api/cart/items
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Update Cart Item
```http
PUT /api/cart/items/:productId
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /api/cart/items/:productId
Authorization: Bearer <token>
```

### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <token>
```

### Apply Coupon
```http
POST /api/cart/coupon
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "couponCode": "SAVE10"
}
```

### Remove Coupon
```http
DELETE /api/cart/coupon
Authorization: Bearer <token>
```

---

## Order Endpoints (Authenticated)

### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "billingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card",
  "notes": "Please gift wrap"
}
```

### Get My Orders
```http
GET /api/orders?page=1&limit=10
Authorization: Bearer <token>
```

### Get Order Details
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

### Cancel Order
```http
PUT /api/orders/:id/cancel
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "reason": "Changed my mind"
}
```

---

## User Endpoints (Authenticated)

### Get Dashboard Stats
```http
GET /api/users/dashboard-stats
Authorization: Bearer <token>
```

### Get Wishlist
```http
GET /api/users/wishlist
Authorization: Bearer <token>
```

### Add to Wishlist
```http
POST /api/users/wishlist
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "productId": "product_id_here"
}
```

### Remove from Wishlist
```http
DELETE /api/users/wishlist/:productId
Authorization: Bearer <token>
```

### Get Addresses
```http
GET /api/users/addresses
Authorization: Bearer <token>
```

### Add Address
```http
POST /api/users/addresses
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA",
  "label": "home",
  "isDefault": true
}
```

---

## Admin Endpoints (Admin Only)

### Get All Users
```http
GET /api/users
Authorization: Bearer <admin_token>
```

### Get All Orders
```http
GET /api/orders/admin/all
Authorization: Bearer <admin_token>
```

### Update Order Status
```http
PUT /api/orders/:id/status
Authorization: Bearer <admin_token>
```
**Request Body:**
```json
{
  "status": "shipped",
  "note": "Order shipped via FedEx"
}
```

### Add Tracking Info
```http
PUT /api/orders/:id/tracking
Authorization: Bearer <admin_token>
```
**Request Body:**
```json
{
  "carrier": "FedEx",
  "trackingNumber": "1234567890",
  "estimatedDelivery": "2024-01-15"
}
```

### Create Product
```http
POST /api/products
Authorization: Bearer <admin_token>
```

### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <admin_token>
```

### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <admin_token>
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 5,
    "totalItems": 100,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    { "field": "email", "message": "Email is required" }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| General API | 100 requests per 15 minutes |
| Login | 10 requests per 15 minutes |
| Register | 5 requests per 15 minutes |
| Password Reset | 3 requests per hour |
| Create Order | 10 requests per hour |
