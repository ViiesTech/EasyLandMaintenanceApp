# API Integration Guide

## Setup

### 1. Install Required Dependencies

```bash
npm install @react-native-async-storage/async-storage
```

### 2. Update API Base URL

Edit `src/services/api.js` and update the `API_BASE_URL`:

```javascript
// For Android Emulator
const API_BASE_URL = 'http://10.0.2.2:5000/api';

// For iOS Simulator
const API_BASE_URL = 'http://localhost:5000/api';

// For Physical Device (replace with your computer's IP)
const API_BASE_URL = 'http://192.168.1.100:5000/api';
```

### 3. Wrap Your App with AuthProvider

In `App.tsx`:

```javascript
import { AuthProvider } from './src/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your existing app components */}
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
```

## Usage Examples

### Authentication

#### Login Screen
```javascript
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Your login UI
    <AppButton title="Login" handlePress={handleLogin} loading={loading} />
  );
};
```

#### SignUp Screen
```javascript
import { useAuth } from '../../context/AuthContext';

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });
  const { register } = useAuth();

  const handleSignUp = async () => {
    const result = await register(formData);
    if (result.success) {
      navigation.navigate('Main');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    // Your signup UI
  );
};
```

### Services

#### Get and Display Services
```javascript
import ApiService from '../../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await ApiService.getServices();
      if (response.success) {
        setServices(response.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={services}
      renderItem={({ item }) => (
        <ServiceCard service={item} />
      )}
    />
  );
};
```

#### Get Popular Services
```javascript
const Home = () => {
  const [popularServices, setPopularServices] = useState([]);

  useEffect(() => {
    loadPopularServices();
  }, []);

  const loadPopularServices = async () => {
    try {
      const response = await ApiService.getPopularServices();
      if (response.success) {
        setPopularServices(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Render popular services
};
```

### Bookings

#### Create Booking
```javascript
import ApiService from '../../services/api';

const ServicesProfile = ({ route }) => {
  const { service } = route.params;

  const handleBooking = async () => {
    const bookingData = {
      serviceId: service._id,
      bookingDetails: {
        date: selectedDate,
        time: selectedTime,
        location: {
          address: address,
          city: city,
          state: state,
          coordinates: {
            latitude: latitude,
            longitude: longitude,
          },
        },
        specialInstructions: instructions,
      },
      pricing: {
        servicePrice: service.price.startingCost,
        taxAmount: 0,
        totalPrice: service.price.startingCost,
      },
    };

    try {
      const response = await ApiService.createBooking(bookingData);
      if (response.success) {
        Alert.alert('Success', 'Booking created successfully!');
        navigation.navigate('Tasks');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    // Your booking UI
  );
};
```

#### Get User's Tasks/Bookings
```javascript
const Tasks = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      const response = await ApiService.getMyBookings(activeTab);
      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    // Display bookings based on activeTab
  );
};
```

#### Cancel Booking
```javascript
const cancelBooking = async (bookingId) => {
  try {
    const response = await ApiService.cancelBooking(bookingId, 'Change of plans');
    if (response.success) {
      Alert.alert('Success', 'Booking cancelled');
      fetchBookings(); // Refresh list
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
```

#### Rate Service
```javascript
const ServiceComplete = ({ route }) => {
  const { bookingId } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitRating = async () => {
    try {
      const response = await ApiService.rateBooking(bookingId, rating, comment);
      if (response.success) {
        Alert.alert('Success', 'Thank you for your rating!');
        navigation.navigate('Tasks');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    // Your rating UI
  );
};
```

### Messages

#### Get Conversations
```javascript
const Messages = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await ApiService.getConversations();
      if (response.success) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    // Display conversations
  );
};
```

#### Send Message
```javascript
const Chat = ({ route }) => {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        receiverId: receiverId,
        messageType: 'text',
        content: {
          text: newMessage,
        },
      };

      const response = await ApiService.sendMessage(conversationId, messageData);
      if (response.success) {
        setMessages([...messages, response.data]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    // Chat UI
  );
};
```

### Account/Profile

#### Update Profile
```javascript
import { useAuth } from '../../context/AuthContext';

const EditAccount = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
  });

  const handleSave = async () => {
    const result = await updateUserProfile(formData);
    if (result.success) {
      Alert.alert('Success', 'Profile updated');
      navigation.goBack();
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    // Edit profile UI
  );
};
```

#### Logout
```javascript
import { useAuth } from '../../context/AuthContext';

const Account = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();
            navigation.navigate('Auth');
          },
        },
      ]
    );
  };

  return (
    // Account UI with logout button
  );
};
```

### Payment Methods

#### Get Payment Methods
```javascript
const AddNewPaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await ApiService.getPaymentMethods();
      if (response.success) {
        setPaymentMethods(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addCard = async (cardData) => {
    try {
      const response = await ApiService.addPaymentMethod({
        type: 'card',
        cardDetails: cardData,
      });
      if (response.success) {
        fetchPaymentMethods(); // Refresh list
        Alert.alert('Success', 'Card added successfully');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    // Payment methods UI
  );
};
```

### Notifications

#### Get Notifications
```javascript
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await ApiService.getNotifications();
      if (response.success) {
        setNotifications(response.data);
        setUnreadCount(response.unreadCount);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await ApiService.markNotificationAsRead(notificationId);
      fetchNotifications(); // Refresh
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    // Notifications UI
  );
};
```

## Error Handling

Always wrap API calls in try-catch blocks:

```javascript
try {
  const response = await ApiService.someMethod();
  if (response.success) {
    // Handle success
  }
} catch (error) {
  // Handle error
  Alert.alert('Error', error.message);
  console.error('API Error:', error);
}
```

## Testing

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Verify API is running:
```bash
curl http://localhost:5000/api/health
```

3. Test with sample credentials:
- Email: alexsmith@gmail.com
- Password: password123

## Common Issues

### Connection Refused
- Make sure backend server is running
- Check API_BASE_URL is correct for your device/emulator
- For physical devices, use your computer's IP address

### Authentication Errors
- Token might be expired (JWT_EXPIRE in .env)
- Clear app data and login again

### CORS Errors
- Backend has CORS enabled by default
- If issues persist, add your device IP to CORS whitelist

## Next Steps

1. Integrate APIs into all screens
2. Add loading states and error handling
3. Implement real-time updates with Socket.io
4. Add offline support with local storage
5. Implement image upload for profile pictures

Happy coding! 🚀
