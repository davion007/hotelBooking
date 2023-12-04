// controllers/housekeepingController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const viewCheckedOutRooms = async (req, res) => {
  // Implementation for viewing checked-out rooms
  const checkedOutRooms = await prisma.roomBooking.findMany({
    where: {
      status: 'O', // Assuming 'O' stands for checked out
    },
    include: { rooms: true },
  });

  res.json({ checkedOutRooms });
};

// const updateRoomStatus = async (req, res) => {
//   // Implementation for updating room status
//   const { roomId } 


module.exports = {
    viewCheckedOutRooms
}