const { PaymentMethod, Transaction } = require('../models/Payment');
const Booking = require('../models/Booking');

// @desc    Get user's payment methods
// @route   GET /api/payments/methods
// @access  Private
exports.getPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethod.find({
      user: req.user.id,
      isActive: true
    }).sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: paymentMethods.length,
      data: paymentMethods
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add payment method
// @route   POST /api/payments/methods
// @access  Private
exports.addPaymentMethod = async (req, res, next) => {
  try {
    const { type, cardDetails, stripePaymentMethodId } = req.body;

    // If this is the first payment method, make it default
    const existingMethods = await PaymentMethod.find({
      user: req.user.id,
      isActive: true
    });

    const isDefault = existingMethods.length === 0;

    const paymentMethod = await PaymentMethod.create({
      user: req.user.id,
      type,
      cardDetails: {
        ...cardDetails,
        last4Digits: cardDetails.cardNumber ? cardDetails.cardNumber.slice(-4) : undefined
      },
      stripePaymentMethodId,
      isDefault
    });

    res.status(201).json({
      success: true,
      data: paymentMethod
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete payment method
// @route   DELETE /api/payments/methods/:id
// @access  Private
exports.deletePaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id);

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found'
      });
    }

    // Make sure user owns payment method
    if (paymentMethod.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this payment method'
      });
    }

    paymentMethod.isActive = false;
    await paymentMethod.save();

    // If this was default, set another as default
    if (paymentMethod.isDefault) {
      const anotherMethod = await PaymentMethod.findOne({
        user: req.user.id,
        isActive: true,
        _id: { $ne: paymentMethod._id }
      });

      if (anotherMethod) {
        anotherMethod.isDefault = true;
        await anotherMethod.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Payment method deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Set default payment method
// @route   PUT /api/payments/methods/:id/default
// @access  Private
exports.setDefaultPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id);

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found'
      });
    }

    // Make sure user owns payment method
    if (paymentMethod.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this payment method'
      });
    }

    // Unset all other default methods
    await PaymentMethod.updateMany(
      { user: req.user.id, isDefault: true },
      { isDefault: false }
    );

    // Set this as default
    paymentMethod.isDefault = true;
    await paymentMethod.save();

    res.status(200).json({
      success: true,
      data: paymentMethod
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create payment intent (for Stripe integration)
// @route   POST /api/payments/create-intent
// @access  Private
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { bookingId, amount, paymentMethodId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user owns booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Create transaction record
    const transaction = await Transaction.create({
      user: req.user.id,
      booking: bookingId,
      paymentMethod: paymentMethodId,
      amount,
      status: 'processing',
      transactionType: 'payment'
    });

    // In production, integrate with Stripe here
    // const paymentIntent = await stripe.paymentIntents.create({ ... });

    res.status(200).json({
      success: true,
      data: {
        transactionId: transaction._id,
        // clientSecret: paymentIntent.client_secret // For Stripe
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's transactions
// @route   GET /api/payments/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('booking', 'service bookingDetails status')
      .populate('paymentMethod', 'type cardDetails.last4Digits cardDetails.cardBrand')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};
