const express = require('express');
const router = express.Router();
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  getPopularServices
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getServices)
  .post(protect, authorize('admin', 'provider'), createService);

router.get('/popular', getPopularServices);

router.route('/:id')
  .get(getService)
  .put(protect, authorize('admin', 'provider'), updateService)
  .delete(protect, authorize('admin'), deleteService);

module.exports = router;
