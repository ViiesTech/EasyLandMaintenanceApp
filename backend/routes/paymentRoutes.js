const express = require('express');
const router = express.Router();
const {
  getPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  createPaymentIntent,
  getTransactions
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/methods')
  .get(getPaymentMethods)
  .post(addPaymentMethod);

router.route('/methods/:id')
  .delete(deletePaymentMethod);

router.put('/methods/:id/default', setDefaultPaymentMethod);

router.post('/create-intent', createPaymentIntent);
router.get('/transactions', getTransactions);

module.exports = router;
