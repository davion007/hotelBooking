// controllers/housekeepingController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getOccupiedBookings = async (req, res) => {
  try {
    // Fetch all bookings with 'X' status
    const occupiedBookings = await prisma.room.findMany({
      where: {
        r_status: 'C',
      },
    });

    res.status(200).json({ occupiedBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const checkOutBooking = async (req, res) => {
  const { r_no } = req.body; 

  try {

    await prisma.room.update({
      where: {
        r_no: r_no,
      },
      data: {
        r_status: 'A',
      },
    });

    res.status(200).json({ message: 'Check-out successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
    getOccupiedBookings,
    checkOutBooking
}