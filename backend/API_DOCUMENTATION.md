# API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication

All authenticated endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "userType": "customer",
  "dateOfBirth": "1997-10-15"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "userType": "customer"
  }
}
```

### Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get Current User
**GET** `/auth/me` 🔒

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "userType": "customer",
    "location": "New York, NY"
  }
}
```

### Update Profile
**PUT** `/auth/update-profile` 🔒

**Body:**
```json
{
  "fullName": "John Smith",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY"
  },
  "notificationsEnabled": true
}
```

### Forgot Password
**POST** `/auth/forgot-password`

**Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset token sent",
  "resetToken": "abc123..."
}
```

### Reset Password
**POST** `/auth/reset-password/:token`

**Body:**
```json
{
  "password": "newpassword123"
}
```

---

## 🛠️ Services

### Get All Services
**GET** `/services`

**Query Parameters:**
- `category` - Filter by category
- `availability` - Filter by availability (available, high_demand, unavailable)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search by title

**Example:**
```
GET /services?category=Plant Selection&availability=available&minPrice=20&maxPrice=100
```

**Response (200):**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Plant Selection",
      "description": "Expert plant selection service...",
      "category": "Plant Selection",
      "price": {
        "startingCost": 49,
        "currency": "USD",
        "priceType": "fixed"
      },
      "bgColor": "#E8F5E9",
      "iconColor": "#00A63E",
      "availability": "available",
      "rating": {
        "average": 4.5,
        "count": 120
      }
    }
  ]
}
```

### Get Popular Services
**GET** `/services/popular`

**Response (200):**
```json
{
  "success": true,
  "count": 4,
  "data": [...]
}
```

### Get Single Service
**GET** `/services/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Plant Selection",
    "description": "Expert plant selection service...",
    "features": [
      "Climate-appropriate plant recommendations",
      "Soil analysis and compatibility"
    ],
    "duration": {
      "estimated": 2,
      "unit": "hours"
    }
  }
}
```

### Create Service
**POST** `/services` 🔒 (Admin/Provider only)

**Body:**
```json
{
  "title": "Garden Design",
  "description": "Complete garden design service",
  "category": "Landscaping",
  "price": {
    "startingCost": 150,
    "priceType": "fixed"
  },
  "availability": "available"
}
```

---

## 📅 Bookings

### Get User Bookings
**GET** `/bookings/my-bookings` 🔒

**Query Parameters:**
- `status` - Filter by status (ongoing, completed, history)

**Example:**
```
GET /bookings/my-bookings?status=ongoing
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "service": {
        "_id": "507f191e810c19729de860ea",
        "title": "Plant Selection",
        "price": { "startingCost": 49 }
      },
      "status": "ongoing",
      "bookingDetails": {
        "date": "2025-12-01T00:00:00.000Z",
        "time": "10:00 AM",
        "location": {
          "address": "123 Main St",
          "city": "New York"
        }
      },
      "pricing": {
        "totalPrice": 49
      },
      "progress": {
        "percentage": 50
      }
    }
  ]
}
```

### Create Booking
**POST** `/bookings` 🔒

**Body:**
```json
{
  "serviceId": "507f191e810c19729de860ea",
  "bookingDetails": {
    "date": "2025-12-01",
    "time": "10:00 AM",
    "location": {
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "coordinates": {
        "latitude": 40.7128,
        "longitude": -74.0060
      }
    },
    "specialInstructions": "Please call before arriving"
  },
  "pricing": {
    "servicePrice": 49,
    "taxAmount": 4.9,
    "totalPrice": 53.9
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f191e810c19729de860ea",
    "service": {
      "_id": "507f191e810c19729de860eb",
      "title": "Plant Selection"
    },
    "status": "pending",
    "createdAt": "2025-11-15T10:00:00.000Z"
  }
}
```

### Cancel Booking
**PUT** `/bookings/:id/cancel` 🔒

**Body:**
```json
{
  "reason": "Schedule conflict"
}
```

### Rate Booking
**PUT** `/bookings/:id/rate` 🔒

**Body:**
```json
{
  "stars": 5,
  "comment": "Excellent service!"
}
```

---

## 💬 Messages

### Get Conversations
**GET** `/messages/conversations` 🔒

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "participants": [
        {
          "_id": "507f191e810c19729de860ea",
          "fullName": "John Doe",
          "profileImage": "avatar.jpg"
        }
      ],
      "lastMessage": {
        "content": { "text": "Thanks!" },
        "createdAt": "2025-11-15T10:00:00.000Z"
      },
      "unreadCount": 2
    }
  ]
}
```

### Get Messages
**GET** `/messages/conversations/:id/messages` 🔒

**Response (200):**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "sender": {
        "_id": "507f191e810c19729de860ea",
        "fullName": "John Doe"
      },
      "messageType": "text",
      "content": {
        "text": "Hello, when can you start?"
      },
      "isRead": true,
      "createdAt": "2025-11-15T10:00:00.000Z"
    }
  ]
}
```

### Send Message
**POST** `/messages/conversations/:id/messages` 🔒

**Body:**
```json
{
  "receiverId": "507f191e810c19729de860ea",
  "messageType": "text",
  "content": {
    "text": "I can start tomorrow morning"
  }
}
```

---

## 💳 Payments

### Get Payment Methods
**GET** `/payments/methods` 🔒

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "type": "card",
      "cardDetails": {
        "last4Digits": "4242",
        "cardBrand": "visa",
        "expiryMonth": "12",
        "expiryYear": "2025"
      },
      "isDefault": true
    }
  ]
}
```

### Add Payment Method
**POST** `/payments/methods` 🔒

**Body:**
```json
{
  "type": "card",
  "cardDetails": {
    "cardNumber": "4242424242424242",
    "cardHolderName": "John Doe",
    "expiryMonth": "12",
    "expiryYear": "2025",
    "cardBrand": "visa"
  }
}
```

### Get Transactions
**GET** `/payments/transactions` 🔒

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "amount": 53.9,
      "status": "completed",
      "transactionType": "payment",
      "booking": {
        "service": "Plant Selection"
      },
      "createdAt": "2025-11-15T10:00:00.000Z"
    }
  ]
}
```

---

## 🔔 Notifications

### Get Notifications
**GET** `/notifications` 🔒

**Query Parameters:**
- `unreadOnly` - true/false

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "unreadCount": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Booking Confirmed",
      "message": "Your booking for Plant Selection has been confirmed",
      "type": "booking",
      "isRead": false,
      "createdAt": "2025-11-15T10:00:00.000Z"
    }
  ]
}
```

### Mark as Read
**PUT** `/notifications/:id` 🔒

### Mark All as Read
**PUT** `/notifications/mark-all-read` 🔒

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

🔒 = Requires Authentication

For more details, see [README.md](./README.md)
