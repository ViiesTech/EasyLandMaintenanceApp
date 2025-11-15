const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Service = require('./models/Service');
const Booking = require('./models/Booking');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const users = [
  {
    fullName: 'Admin User',
    email: 'admin@easylandmaintenance.com',
    password: 'admin123',
    phone: '+1234567890',
    userType: 'admin',
    isEmailVerified: true,
    isPhoneVerified: true
  },
  {
    fullName: 'Alex Smith',
    email: 'alexsmith@gmail.com',
    password: 'password123',
    phone: '+1(234)64 6759 888',
    dateOfBirth: new Date('1997-10-15'),
    userType: 'customer',
    location: 'New York, NY',
    isEmailVerified: true
  },
  {
    fullName: 'Gregory Smith',
    email: 'gregory@provider.com',
    password: 'password123',
    phone: '+1234567891',
    userType: 'provider',
    isEmailVerified: true,
    isPhoneVerified: true
  }
];

const services = [
  {
    title: 'Plant Selection',
    description: 'Expert plant selection service for your garden or landscape. We help you choose the right plants based on your climate, soil, and design preferences.',
    category: 'Plant Selection',
    price: {
      startingCost: 49,
      currency: 'USD',
      priceType: 'fixed'
    },
    bgColor: '#E8F5E9',
    iconColor: '#00A63E',
    duration: {
      estimated: 2,
      unit: 'hours'
    },
    availability: 'available',
    rating: {
      average: 4.5,
      count: 120
    },
    features: [
      'Climate-appropriate plant recommendations',
      'Soil analysis and compatibility',
      'Design consultation',
      'Maintenance guidelines'
    ]
  },
  {
    title: 'Cleaning',
    description: 'Professional outdoor cleaning services including yard cleanup, debris removal, and maintenance.',
    category: 'Cleaning',
    price: {
      startingCost: 45,
      currency: 'USD',
      priceType: 'hourly'
    },
    bgColor: '#E3F2FD',
    iconColor: '#1976D2',
    duration: {
      estimated: 3,
      unit: 'hours'
    },
    availability: 'high_demand',
    rating: {
      average: 4.8,
      count: 200
    },
    features: [
      'Yard debris removal',
      'Lawn cleanup',
      'Gutter cleaning',
      'Pressure washing'
    ]
  },
  {
    title: 'Pest Control',
    description: 'Eco-friendly pest control solutions for your garden and outdoor spaces.',
    category: 'Pest Control',
    price: {
      startingCost: 45,
      currency: 'USD',
      priceType: 'fixed'
    },
    bgColor: '#FFEBEE',
    iconColor: '#D32F2F',
    duration: {
      estimated: 1.5,
      unit: 'hours'
    },
    availability: 'available',
    rating: {
      average: 4.6,
      count: 85
    },
    features: [
      'Organic pest solutions',
      'Preventative treatments',
      'Safe for pets and children',
      'Follow-up service included'
    ]
  },
  {
    title: 'Irrigation Repair',
    description: 'Complete irrigation system repair and maintenance services.',
    category: 'Irrigation Repair',
    price: {
      startingCost: 55,
      currency: 'USD',
      priceType: 'hourly'
    },
    bgColor: '#CEFAFE',
    iconColor: '#00897B',
    duration: {
      estimated: 2,
      unit: 'hours'
    },
    availability: 'available',
    rating: {
      average: 4.7,
      count: 150
    },
    features: [
      'Leak detection and repair',
      'Sprinkler head replacement',
      'Timer and controller repair',
      'System optimization'
    ]
  },
  {
    title: 'Lawn Mowing',
    description: 'Professional lawn mowing and edging services for a pristine yard.',
    category: 'Lawn Mowing',
    price: {
      startingCost: 35,
      currency: 'USD',
      priceType: 'per_sqft'
    },
    bgColor: '#DCFCE7',
    iconColor: '#00A63E',
    duration: {
      estimated: 1,
      unit: 'hours'
    },
    availability: 'high_demand',
    rating: {
      average: 4.9,
      count: 300
    },
    features: [
      'Precision cutting',
      'Edge trimming',
      'Grass collection',
      'Weekly or bi-weekly service'
    ]
  },
  {
    title: 'Tree Trimming',
    description: 'Professional tree trimming and pruning services for healthy trees.',
    category: 'Tree Trimming',
    price: {
      startingCost: 75,
      currency: 'USD',
      priceType: 'fixed'
    },
    bgColor: '#E8F5E9',
    iconColor: '#00A63E',
    duration: {
      estimated: 3,
      unit: 'hours'
    },
    availability: 'available',
    rating: {
      average: 4.8,
      count: 95
    },
    features: [
      'Certified arborists',
      'Safety equipment included',
      'Debris removal',
      'Health assessment'
    ]
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Service.deleteMany();
    await Booking.deleteMany();

    // Insert sample data
    const createdUsers = await User.create(users);
    const createdServices = await Service.create(services);

    console.log('✅ Data Imported Successfully!');
    console.log(`📊 ${createdUsers.length} users created`);
    console.log(`🛠️  ${createdServices.length} services created`);
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Service.deleteMany();
    await Booking.deleteMany();

    console.log('🗑️  Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('⚠️  Please use: node seeder.js -i (import) or -d (delete)');
  process.exit();
}
