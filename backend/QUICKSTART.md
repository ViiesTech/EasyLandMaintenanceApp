# Quick Start Guide

## Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment
Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection:
```env
MONGODB_URI=mongodb://localhost:27017/easylandmaintenance
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3. Start MongoDB
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (recommended for production)
# Get connection string from https://cloud.mongodb.com
```

### 4. Seed Sample Data (Optional)
```bash
node seeder.js -i
```

This creates:
- Admin user: admin@easylandmaintenance.com / admin123
- Customer user: alexsmith@gmail.com / password123
- Provider user: gregory@provider.com / password123
- 6 sample services

### 5. Start Server
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

Server runs on: `http://localhost:5000`

### 6. Test API
Health check:
```bash
curl http://localhost:5000/api/health
```

Register a user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alexsmith@gmail.com",
    "password": "password123"
  }'
```

Get services:
```bash
curl http://localhost:5000/api/services
```

## Common Commands

### Database
```bash
# Import sample data
node seeder.js -i

# Delete all data
node seeder.js -d
```

### Development
```bash
# Install dependencies
npm install

# Run development server (with nodemon)
npm run dev

# Run production server
npm start
```

## Testing with Postman

1. Import the API collection
2. Set base URL: `http://localhost:5000`
3. For protected routes, add header:
   - Key: `Authorization`
   - Value: `Bearer <your_token>`

## Project Structure

```
backend/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Auth, validation, error handling
├── models/          # MongoDB schemas
├── routes/          # API routes
├── .env            # Environment variables
├── server.js       # Entry point
├── seeder.js       # Sample data seeder
└── README.md       # Documentation
```

## Next Steps

1. **Connect Mobile App**
   - Update API base URL in your React Native app
   - Implement authentication flow
   - Connect service listings

2. **Add Features**
   - Real-time messaging with Socket.io
   - Email notifications
   - Payment integration (Stripe)
   - File upload for images

3. **Deploy**
   - Choose platform (Heroku, DigitalOcean, AWS)
   - Set production environment variables
   - Use MongoDB Atlas for database
   - Enable HTTPS

## Troubleshooting

**Port already in use?**
```bash
# Change PORT in .env file
PORT=3000
```

**MongoDB connection error?**
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- For Atlas, whitelist your IP

**JWT errors?**
- Ensure JWT_SECRET is set in .env
- Check token format: `Bearer <token>`

**CORS errors?**
- Update FRONTEND_URL in .env
- Check CORS configuration in server.js

## Support

- Documentation: See README.md
- API Reference: Check route files
- Sample Data: Use seeder.js

Happy coding! 🚀
