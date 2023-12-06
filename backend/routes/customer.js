// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const {
  fetchHotelData,
  fetchHotelByClass,
  signUp,
  login,
  fetchSingleHotelData,
  fetchUserBookings,
  createBooking,
  checkInOut,
  fetchRatesData,
  me
} = require('../controllers/customer');
const { userAuth } = require('../auth');

router.get('/hotel-data', fetchHotelData);
router.get('/room-rates', fetchRatesData)
router.post('/sign-up', signUp);
router.post('/login', login);
router.get('/hotel-by-class/:r_class', fetchHotelByClass);
router.get('/hotel-data/:r_no', fetchSingleHotelData);
router.get('/user-bookings/:c_no', fetchUserBookings);
router.post('/create-booking', createBooking);
router.post('/check-in-out', checkInOut);

router.get('/me',userAuth, me);

module.exports = router;
