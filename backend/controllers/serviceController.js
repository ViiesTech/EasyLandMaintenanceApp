const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    const { category, availability, minPrice, maxPrice, search } = req.query;
    
    let query = { isActive: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by availability
    if (availability) {
      query.availability = availability;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query['price.startingCost'] = {};
      if (minPrice) query['price.startingCost'].$gte = Number(minPrice);
      if (maxPrice) query['price.startingCost'].$lte = Number(maxPrice);
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const services = await Service.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get popular services
// @route   GET /api/services/popular
// @access  Public
exports.getPopularServices = async (req, res, next) => {
  try {
    const services = await Service.find({ 
      isActive: true,
      availability: { $in: ['available', 'high_demand'] }
    })
    .sort({ 'rating.average': -1, 'rating.count': -1 })
    .limit(4);

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin/Provider
exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin/Provider
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
