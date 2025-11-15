const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  rateBooking,
  getUserBookings
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.get('/my-bookings', getUserBookings);

router.route('/:id')
  .get(getBooking)
  .put(updateBooking);

router.put('/:id/cancel', cancelBooking);
router.put('/:id/rate', rateBooking);

module.exports = router;
