// routes/housekeepingRoutes.js
const express = require('express');
const router = express.Router();
const {
  viewCheckedOutRooms,
  updateRoomStatus,
} = require('../controllers/houseKeeping');

router.get('/checked-out-rooms', viewCheckedOutRooms);
router.post('/update-room-status/:roomId', updateRoomStatus);

module.exports = router;
