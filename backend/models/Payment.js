const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['card', 'bank', 'wallet'],
    required: true
  },
  cardDetails: {
    cardNumber: {
      type: String,
      select: false // Hide sensitive data by default
    },
    last4Digits: String,
    cardHolderName: String,
    expiryMonth: String,
    expiryYear: String,
    cardBrand: {
      type: String,
      enum: ['visa', 'mastercard', 'amex', 'discover', 'other']
    }
  },
  stripeCustomerId: String,
  stripePaymentMethodId: String,
  isDefault: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionType: {
    type: String,
    enum: ['payment', 'refund'],
    default: 'payment'
  },
  stripePaymentIntentId: String,
  stripeChargeId: String,
  failureReason: String,
  metadata: {
    type: Map,
    of: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
paymentMethodSchema.index({ user: 1, isDefault: 1 });
transactionSchema.index({ user: 1, status: 1 });
transactionSchema.index({ booking: 1 });

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { PaymentMethod, Transaction };
