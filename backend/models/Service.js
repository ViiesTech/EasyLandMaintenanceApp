const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a service title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a service description']
  },
  category: {
    type: String,
    required: true,
    enum: ['Plant Selection', 'Cleaning', 'Pest Control', 'Irrigation Repair', 'Lawn Mowing', 'Tree Trimming', 'Landscaping', 'Other']
  },
  price: {
    startingCost: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    priceType: {
      type: String,
      enum: ['fixed', 'hourly', 'per_sqft'],
      default: 'fixed'
    }
  },
  icon: {
    type: String,
    default: 'default-service-icon.png'
  },
  image: {
    type: String
  },
  bgColor: {
    type: String,
    default: '#E8F5E9'
  },
  iconColor: {
    type: String,
    default: '#00A63E'
  },
  duration: {
    estimated: Number, // in minutes
    unit: {
      type: String,
      enum: ['minutes', 'hours', 'days'],
      default: 'hours'
    }
  },
  availability: {
    type: String,
    enum: ['available', 'high_demand', 'unavailable'],
    default: 'available'
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  features: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
