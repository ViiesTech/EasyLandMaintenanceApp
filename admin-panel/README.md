# EasyLand Maintenance - Admin Panel

A modern admin panel built with React and Material-UI for managing the EasyLand Maintenance platform.

## Features

- **Dashboard**: Overview statistics (users, services, bookings, revenue)
- **User Management**: View, edit, and manage customer/provider accounts
- **Service Management**: Create, edit, and manage available services
- **Booking Management**: View bookings, update status, manage appointments
- **Payment Tracking**: Monitor transactions and revenue analytics
- **Settings**: Configure platform settings and preferences

## Tech Stack

- **Frontend**: React 18.2.0
- **UI Framework**: Material-UI (MUI) 5.14.19
- **Routing**: React Router DOM 6.20.0
- **Data Tables**: MUI X Data Grid 6.18.2
- **Charts**: Chart.js 4.4.0 + React Chart.js 2
- **HTTP Client**: Axios 1.6.2
- **Date Handling**: date-fns 2.30.0

## Prerequisites

- Node.js 14+ and npm
- Backend API running on http://localhost:5000

## Installation

1. **Navigate to admin-panel directory**:
   ```bash
   cd admin-panel
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the Application

1. **Ensure backend is running**:
   ```bash
   cd ../backend
   npm run dev
   ```

2. **Start the admin panel**:
   ```bash
   cd admin-panel
   npm start
   ```

3. **Access the application**:
   - Open http://localhost:3000
   - Login with admin credentials:
     - Email: `adminuser@gmail.com`
     - Password: `password123`

## Project Structure

```
admin-panel/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.js          # Main layout wrapper
│   │   │   ├── Sidebar.js         # Navigation sidebar
│   │   │   └── Topbar.js          # Top navigation bar
│   │   └── PrivateRoute.js        # Protected route wrapper
│   ├── contexts/
│   │   └── AuthContext.js         # Authentication state
│   ├── pages/
│   │   ├── Login.js               # Login page
│   │   ├── Dashboard.js           # Dashboard with stats
│   │   ├── Users/
│   │   │   ├── UserList.js        # User management table
│   │   │   └── UserDetails.js     # Edit user form
│   │   ├── Services/
│   │   │   ├── ServiceList.js     # Service management table
│   │   │   └── ServiceForm.js     # Create/Edit service
│   │   ├── Bookings/
│   │   │   ├── BookingList.js     # Booking management table
│   │   │   └── BookingDetails.js  # Booking details/status
│   │   ├── Payments/
│   │   │   └── PaymentList.js     # Transaction history
│   │   └── Settings.js            # Platform settings
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── App.js                     # Main app component
│   └── index.js                   # Entry point
├── .env.example
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Run development server (http://localhost:3000)
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Features by Page

### Dashboard
- Total users, services, bookings count
- Revenue analytics
- Quick stats overview

### Users
- Search and filter users
- View user details
- Edit user information
- Manage user roles (Customer/Provider/Admin)
- Delete users

### Services
- View all services
- Create new services
- Edit service details
- Delete services
- Filter by availability status

### Bookings
- View all bookings
- Filter by status (Pending/Confirmed/In Progress/Completed/Cancelled)
- Update booking status
- View booking details
- Cancel bookings
- Assign providers

### Payments
- Transaction history
- Revenue statistics
- Payment status tracking
- Filter transactions

### Settings
- Platform configuration
- Booking settings (cancellation window, auto-confirm)
- Payment settings (platform fee, minimum amount)
- Notification preferences (email, SMS, push)

## Authentication

The admin panel uses JWT token authentication:
- Login with admin credentials
- Token stored in localStorage
- Auto-logout on 401 responses
- Protected routes require authentication
- Only users with 'admin' role can access

## API Integration

All API calls are handled through the `ApiService` in `src/services/api.js`:
- Automatic token injection via axios interceptors
- Centralized error handling
- Base URL configured via environment variables

## Deployment

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Or any static hosting service

3. **Update environment variables** in your hosting platform:
   ```
   REACT_APP_API_URL=https://your-api-domain.com/api
   ```

## Troubleshooting

### Cannot connect to API
- Ensure backend is running on http://localhost:5000
- Check `.env` file has correct `REACT_APP_API_URL`
- Verify CORS is enabled in backend

### Login fails
- Ensure you're using admin credentials
- Check user has role: 'admin' in database
- Verify backend authentication endpoint is working

### Pages not loading data
- Check browser console for errors
- Verify API endpoints return data
- Check authentication token is valid

## Future Enhancements

- [ ] Charts and analytics graphs
- [ ] Export data to CSV/Excel
- [ ] Bulk operations
- [ ] Real-time notifications
- [ ] Provider analytics
- [ ] Customer feedback management
- [ ] Service reviews moderation
- [ ] Advanced filtering and search
- [ ] Dark mode support
- [ ] Multi-language support

## License

Private - EasyLand Maintenance Platform

## Support

For issues or questions, contact: support@easyland.com
