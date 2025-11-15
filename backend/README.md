# EasyLandMaintenance Backend API

Complete RESTful API for the EasyLandMaintenance mobile application built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user profile management with customer/provider/admin roles
- **Service Management**: CRUD operations for landscaping services
- **Booking System**: Full booking lifecycle from creation to completion
- **Real-time Messaging**: Chat functionality for users and service providers
- **Payment Processing**: Payment methods and transaction management
- **Notifications**: Push notification system for app updates
- **Rating & Reviews**: Service rating system
- **Secure**: Password hashing, JWT tokens, input validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/easylandmaintenance
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=30d
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env with your Atlas connection string
   ```

5. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── bookingController.js # Booking operations
│   ├── messageController.js # Messaging functionality
│   ├── notificationController.js
│   ├── paymentController.js
│   ├── serviceController.js
│   └── userController.js
├── middleware/
│   ├── auth.js             # JWT verification
│   ├── errorHandler.js     # Error handling
│   └── validator.js        # Input validation
├── models/
│   ├── Booking.js
│   ├── Message.js
│   ├── Notification.js
│   ├── Payment.js
│   ├── Service.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── messageRoutes.js
│   ├── notificationRoutes.js
│   ├── paymentRoutes.js
│   ├── serviceRoutes.js
│   └── userRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── server.js              # Entry point
```

## 🔑 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| GET | `/me` | Get current user | Private |
| PUT | `/update-profile` | Update user profile | Private |
| PUT | `/update-password` | Change password | Private |
| POST | `/forgot-password` | Request password reset | Public |
| POST | `/reset-password/:token` | Reset password | Public |
| POST | `/verify-email` | Verify email | Private |
| POST | `/verify-phone` | Verify phone | Private |

### Users (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all users | Admin |
| GET | `/:id` | Get user by ID | Private |
| PUT | `/:id` | Update user | Private |
| DELETE | `/:id` | Delete user | Admin |

### Services (`/api/services`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all services | Public |
| GET | `/popular` | Get popular services | Public |
| GET | `/:id` | Get service by ID | Public |
| POST | `/` | Create service | Admin/Provider |
| PUT | `/:id` | Update service | Admin/Provider |
| DELETE | `/:id` | Delete service | Admin |

### Bookings (`/api/bookings`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all bookings | Private |
| GET | `/my-bookings` | Get user's bookings | Private |
| GET | `/:id` | Get booking by ID | Private |
| POST | `/` | Create booking | Private |
| PUT | `/:id` | Update booking | Private |
| PUT | `/:id/cancel` | Cancel booking | Private |
| PUT | `/:id/rate` | Rate completed booking | Private |

### Messages (`/api/messages`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/conversations` | Get all conversations | Private |
| POST | `/conversations` | Create conversation | Private |
| GET | `/conversations/:id` | Get conversation | Private |
| GET | `/conversations/:id/messages` | Get messages | Private |
| POST | `/conversations/:id/messages` | Send message | Private |
| PUT | `/messages/:id/read` | Mark as read | Private |

### Payments (`/api/payments`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/methods` | Get payment methods | Private |
| POST | `/methods` | Add payment method | Private |
| DELETE | `/methods/:id` | Delete payment method | Private |
| PUT | `/methods/:id/default` | Set default method | Private |
| POST | `/create-intent` | Create payment | Private |
| GET | `/transactions` | Get transactions | Private |

### Notifications (`/api/notifications`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get notifications | Private |
| PUT | `/:id` | Mark as read | Private |
| PUT | `/mark-all-read` | Mark all as read | Private |
| DELETE | `/:id` | Delete notification | Private |

## 📝 Request/Response Examples

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "userType": "customer"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "60d5ec49f1b2c72b8c8e4f3a",
    "fullName": "John Doe",
    "email": "john@example.com",
    "userType": "customer"
  }
}
```

### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "60d5ec49f1b2c72b8c8e4f3b",
  "bookingDetails": {
    "date": "2025-12-01",
    "time": "10:00 AM",
    "location": {
      "address": "123 Main St",
      "city": "New York",
      "coordinates": {
        "latitude": 40.7128,
        "longitude": -74.0060
      }
    }
  },
  "pricing": {
    "servicePrice": 49,
    "totalPrice": 49
  }
}
```

### Get Services with Filters
```http
GET /api/services?category=Plant Selection&availability=available&minPrice=20&maxPrice=100
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Models

### User
- Personal information (name, email, phone, DOB)
- Authentication (password, tokens)
- User type (customer, provider, admin)
- Location and preferences

### Service
- Title, description, category
- Pricing information
- Availability status
- Rating and reviews

### Booking
- User and service references
- Booking details (date, time, location)
- Status tracking (pending, ongoing, completed)
- Payment information
- Progress timeline
- Rating

### Message & Conversation
- Chat functionality
- Participant management
- Message types (text, image, file)
- Read status

### Payment
- Payment methods
- Transaction history
- Stripe integration support

### Notification
- User notifications
- Type-based categorization
- Read/unread status

## 🧪 Testing

Test the API using tools like:
- **Postman**: Import endpoints and test
- **Thunder Client**: VS Code extension
- **cURL**: Command-line testing

Health check endpoint:
```bash
curl http://localhost:5000/api/health
```

## 🚀 Deployment

### Environment Variables
Set these in your production environment:
- `NODE_ENV=production`
- `MONGODB_URI` (MongoDB Atlas recommended)
- `JWT_SECRET` (strong secret key)
- Email and Stripe credentials

### Recommended Platforms
- **Heroku**
- **DigitalOcean**
- **AWS EC2**
- **Railway**
- **Render**

## 📞 Support

For issues or questions:
- Check the API documentation
- Review error messages in response
- Verify authentication tokens
- Ensure MongoDB is running

## 📄 License

ISC

---

Built with ❤️ for EasyLandMaintenance
