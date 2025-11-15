const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bookingDetails: {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    duration: {
      value: Number,
      unit: String
    },
    location: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    specialInstructions: String
  },
  pricing: {
    servicePrice: {
      type: Number,
      required: true
    },
    taxAmount: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'ongoing', 'completed', 'cancelled', 'history'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash', 'wallet'],
    default: 'card'
  },
  paymentDetails: {
    transactionId: String,
    paidAt: Date
  },
  progress: {
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    currentStatus: String,
    timeline: [{
      status: String,
      description: String,
      timestamp: {
        type: Date,
        default: Date.now
      },
      icon: String
    }]
  },
  rating: {
    stars: {
      type: Number,
      min: 0,
      max: 5
    },
    comment: String,
    ratedAt: Date
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancellationReason: String,
  cancelledAt: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for faster queries
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ provider: 1, status: 1 });
bookingSchema.index({ 'bookingDetails.date': 1 });

module.exports = mongoose.model('Booking', bookingSchema);
