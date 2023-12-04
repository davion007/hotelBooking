// controllers/receptionController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkInGuest = async (req, res) => {
  // Implementation for checking in a guest
  const { bookingId } = req.params;

  // Update room status to 'checked in'
  await prisma.roomBooking.updateMany({
    where: {
      bookingId,
    },
    data: {
      status: 'C', // Assuming 'C' stands for checked in
    },
  });

  res.json({ message: 'Guest checked in successfully' });
};

const checkOutGuest = async (req, res) => {
  // Implementation for checking out a guest
  const { bookingId } = req.params;

  // Update room status to 'checked out'
  await prisma.roomBooking.updateMany({
    where: {
      bookingId,
    },
    data: {
      status: 'O', // Assuming 'O' stands for checked out
    },
  });

  res.json({ message: 'Guest checked out successfully' });
};

const viewPayments = async (req, res) => {
  // Implementation for viewing payments
  const payments = await prisma.booking.findMany({
    where: {
      paymentReceived: true,
    },
    include: { rooms: true },
  });

  res.json({ payments });
};

const processPayment = async (req, res) => {
  // Implementation for processing payment
  const { bookingId } = req.params;

  // Additional logic for processing payment

  res.json({ message: 'Payment processed successfully' });
};

module.exports = {
  checkInGuest,
  checkOutGuest,
  viewPayments,
  processPayment,
};
