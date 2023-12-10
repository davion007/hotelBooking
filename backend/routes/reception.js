// routes/receptionRoutes.js
const express = require('express');
const router = express.Router();
const {
  checkInGuest,
  checkOutGuest,
  viewBookings,
  viewCustomerById,
} = require('../controllers/reception');

router.post('/check-in/:cId', checkInGuest);
router.post('/check-out/:cId', checkOutGuest);
router.get('/bookings', viewBookings);
router.get('/customers/:id', viewCustomerById);

module.exports = router;
