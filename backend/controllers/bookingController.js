const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Notification = require('../models/Notification');

// @desc    Get all bookings (admin/provider)
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    let query = {};

    // If user is provider, show only their bookings
    if (req.user.userType === 'provider') {
      query.provider = req.user.id;
    }
    // If user is customer, show only their bookings
    else if (req.user.userType === 'customer') {
      query.user = req.user.id;
    }

    const bookings = await Booking.find(query)
      .populate('user', 'fullName email phone profileImage')
      .populate('service', 'title category price')
      .populate('provider', 'fullName email phone profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's bookings by status
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getUserBookings = async (req, res, next) => {
  try {
    const { status } = req.query; // ongoing, completed, history

    let query = { user: req.user.id };

    if (status === 'ongoing') {
      query.status = { $in: ['pending', 'confirmed', 'ongoing'] };
    } else if (status === 'completed') {
      query.status = 'completed';
    } else if (status === 'history') {
      query.status = { $in: ['completed', 'cancelled'] };
    }

    const bookings = await Booking.find(query)
      .populate('service', 'title category price icon bgColor')
      .populate('provider', 'fullName profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'fullName email phone profileImage address')
      .populate('service', 'title description category price duration')
      .populate('provider', 'fullName email phone profileImage');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user is authorized
    if (booking.user._id.toString() !== req.user.id && 
        booking.provider?._id.toString() !== req.user.id &&
        req.user.userType !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    const { serviceId, bookingDetails, pricing } = req.body;

    // Verify service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      service: serviceId,
      bookingDetails,
      pricing,
      status: 'pending',
      progress: {
        percentage: 0,
        timeline: [{
          status: 'Booking Created',
          description: 'Your booking has been created successfully',
          timestamp: new Date()
        }]
      }
    });

    // Create notification
    await Notification.create({
      user: req.user.id,
      title: 'Booking Created',
      message: `Your booking for ${service.title} has been created successfully`,
      type: 'booking',
      relatedTo: {
        model: 'Booking',
        id: booking._id
      }
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('service', 'title category price');

    res.status(201).json({
      success: true,
      data: populatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update booking
    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('service user provider');

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user owns booking
    if (booking.user.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    booking.status = 'cancelled';
    booking.cancelledBy = req.user.id;
    booking.cancellationReason = req.body.reason;
    booking.cancelledAt = Date.now();

    await booking.save();

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Rate completed booking
// @route   PUT /api/bookings/:id/rate
// @access  Private
exports.rateBooking = async (req, res, next) => {
  try {
    const { stars, comment } = req.body;

    const booking = await Booking.findById(req.params.id);

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
        message: 'Not authorized to rate this booking'
      });
    }

    // Make sure booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only rate completed bookings'
      });
    }

    booking.rating = {
      stars,
      comment,
      ratedAt: Date.now()
    };

    await booking.save();

    // Update service rating
    const service = await Service.findById(booking.service);
    if (service) {
      const allRatings = await Booking.find({
        service: service._id,
        'rating.stars': { $exists: true }
      });

      const avgRating = allRatings.reduce((acc, b) => acc + b.rating.stars, 0) / allRatings.length;

      service.rating.average = avgRating;
      service.rating.count = allRatings.length;
      await service.save();
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};
