// controllers/reception.js
const { PrismaClient } = require('@prisma/client');
const e = require('express');
const prisma = new PrismaClient();

// Check-in a guest
exports.checkInGuest = async (req, res) => {
  const cId = parseInt(req.params.cId);
  const rbNo = parseInt(req.body.rbNo);
  console.log(rbNo)
  try {
    // Check if RoomBooking record exists
    const updatedRoomBooking = await prisma.roomBooking.update({
      where: {
        rb_no: rbNo
      },
      data: {
        room: {
          update: {
            r_status: 'O', // 'X' represents an occupied room, modify accordingly
          },
        },
      },
    });

    // You might want to check if the update was successful or handle errors appropriately
    if (!updatedRoomBooking) {
      res.status(400).json({ message: 'Failed to update room status' });
      return;
    }

    // Send the updated booking as a response
    res.json({ updatedRoomBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Check-out a guest
exports.checkOutGuest = async (req, res) => {
  const cId = parseInt(req.params.cId);
  const rbNo = parseInt(req.body.rbNo);
  console.log(rbNo)
  try {
    // Check if RoomBooking record exists
    const updatedRoomBooking = await prisma.roomBooking.update({
      where: {
        rb_no: rbNo
      },
      data: {
        room: {
          update: {
            r_status: 'C', // 'X' represents an occupied room, modify accordingly
          },
        },
      },
    });

    // You might want to check if the update was successful or handle errors appropriately
    if (!updatedRoomBooking) {
      res.status(400).json({ message: 'Failed to update room status' });
      return;
    }

    // Send the updated booking as a response
    res.json({ updatedRoomBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// View all bookings
exports.viewBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        customer: true,
        roomBookings: {
          include: {
            room: true,
          },
        },
      },
    });

    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// View customer and all bookings by ID
exports.viewCustomerById = async (req, res) => {
  const customerId = parseInt(req.params.id);

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        c_no: customerId,
      },
    });

    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }

    const bookings = await prisma.booking.findMany({
      where: {
        c_no: customerId,
      },
      include: {
        roomBookings: {
          include: {
            room: true,
          },
        },
      },
    });
    console.log(customer, bookings)
    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

