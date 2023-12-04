// controllers/customerController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const fetchHotelData = async (req, res) => {
  // Implementation for fetching all hotel data merged with its images
  const hotelData = await prisma.room.findMany({
    include: {
      RoomImage: true,

    },
  });

  res.json({ hotelData });
};

const fetchRatesData = async (req, res) => {
  const ratesData = await prisma.rates.findMany({});
  res.json({ ratesData });
}

const signUp = async (req, res) => {
  // Implementation for customer sign up
  const { c_name, c_email, c_address, c_cardtype, c_cardexp,  password } = req.body;
  c_cardno = req.body.c_cardno+"";
  // Create customer and associated password
  const customer = await prisma.customer.create({
    data: {
      c_name :c_name,
      c_email :c_email,
      c_address :c_address,
      c_cardtype :c_cardtype,
      c_cardexp : c_cardexp,
      c_cardno :c_cardno,
      UserPassword: {
        create: {
          password : password,
        },
      },
    },
    include: {
      UserPassword: true,
    },
  });
  const token = generateToken(customer.c_no)
  res.status(200).json({ customer, token });

};

const login = async (req, res) => {
  // Implementation for customer login
  const { c_email, password } = req.body;

  // Check customer credentials
  const customer = await prisma.customer.findUnique({
    where: { c_email },
    include: { UserPassword: true },
  });
  
  if (!customer || customer.UserPassword.password !== password) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const token = generateToken(customer.c_no)
  res.json({ customer }, token);
};

const fetchSingleHotelData = async (req, res) => {
  // Implementation for fetching single hotel data
  const { r_no } = req.params;
  const roomData = await prisma.room.findUnique({
    where: { r_no: parseInt(r_no) },
    include: {
      RoomImage: true,
    },
  });

  res.json({ roomData });
};

const fetchHotelByClass = async (req, res) => {
  // Implementation for fetching hotel data by r_class
  const { r_class } = req.params;
  const hotelDataByClass = await prisma.room.findMany({
    where: {
      r_class,
    },
    include: {
      RoomImage: true,
    },
  });

  res.json({ hotelDataByClass });
};

const fetchUserBookings = async (req, res) => {
  // Implementation for fetching all user's current bookings
  const { c_no } = req.params;
  const userBookings = await prisma.booking.findMany({
    where: { c_no: parseInt(c_no) },
    include: {
      rooms: true,
    },
  });

  res.json({ userBookings });
};

const createBooking = async (req, res) => {
  // Implementation for creating a booking for a user
  const { c_no, roomIds, checkin, checkout } = req.body;

  // Check room availability
  const availableRooms = await prisma.room.findMany({
    where: {
      r_no: {
        in: roomIds,
      },
      r_status: 'A', // Assuming 'A' stands for available
    },
  });

  if (availableRooms.length !== roomIds.length) {
    // Some rooms are not available
    const unavailableRooms = roomIds.filter((roomId) => !availableRooms.find((room) => room.r_no === roomId));
    res.status(400).json({ message: 'Some rooms are not available', unavailableRooms });
    return;
  }

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      c_no: parseInt(c_no),
      b_cost: 0, // You may need to calculate the actual cost based on room rates and other factors
      b_outstanding: 0,
      checkin,
      checkout,
      rooms: {
        connect: roomIds.map((roomId) => ({ r_no: roomId })),
      },
    },
  });

  res.json({ booking });
};

const checkInOut = async (req, res) => {
  // Implementation for check in and check out for a user
  const { rb_no, action } = req.body;

  // Update room status based on the action (check in or check out)
  const updatedRoomBooking = await prisma.roomBooking.update({
    where: { rb_no },
    data: {
      room: {
        update: {
          r_status: action === 'checkin' ? 'C' : 'A', // Assuming 'C' stands for checked in
        },
      },
    },
  });

  res.json({ roomBooking: updatedRoomBooking });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
  fetchHotelData,
  fetchHotelByClass,
  fetchRatesData,
  signUp,
  login,
  fetchSingleHotelData,
  fetchUserBookings,
  createBooking,
  checkInOut,
};
