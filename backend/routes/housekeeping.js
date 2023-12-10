// routes/housekeepingRoutes.js
const express = require('express');
const router = express.Router();
const {
  updateRoomStatus,
  getOccupiedBookings,
  checkOutBooking,
} = require('../controllers/houseKeeping');

router.get('/checked-out-rooms', getOccupiedBookings);
router.post('/update-room-status/', checkOutBooking);

module.exports = router;
