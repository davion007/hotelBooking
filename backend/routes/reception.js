// routes/receptionRoutes.js
const express = require('express');
const router = express.Router();
const {
  checkInGuest,
  checkOutGuest,
  viewPayments,
  processPayment,
} = require('../controllers/reception');

router.post('/check-in/:bookingId', checkInGuest);
router.post('/check-out/:bookingId', checkOutGuest);
router.get('/payments', viewPayments);
router.post('/process-payment/:bookingId', processPayment);

module.exports = router;
