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
  console.log(token, "successfully")
  res.status(200).json({ customer, token });

};
const login = async (req, res) => {
  // Implementation for customer login
  const { c_email, password } = req.body;

  const customer = await prisma.customer.findFirst({
    where: {
      c_email: c_email,
    },
  });
  

  if (!customer) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // Now, fetch the associated UserPassword
  const userPassword = await prisma.userPassword.findFirst({
    where: { c_no: customer.c_no },
  });

  if (!userPassword || userPassword.password !== password) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = generateToken(customer.c_no);
  res.json({ customer, token });
};


const fetchSingleHotelData = async (req, res) => {
  // Implementation for fetching single hotel data
  const { r_no } = req.params;
  const roomData = await prisma.room.findFirst({
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
  try {
    const userBookings = await prisma.booking.findMany({
      where: { c_no: parseInt(c_no) },
      include: {
        roomBookings: {
          include: {
            room: true, // Include the room details
          },
        },
      },
    });

    res.json({ userBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createBooking = async (req, res) => {
  const { r_no, c_no, roomno, checkin, checkout, price } = req.body;
  try {
    console.log(r_no)
    // Check room availability
    const availableRoom = await prisma.room.findFirst({
      where: {
        r_no: parseInt(r_no),
        r_status: 'A', // Assuming 'A' stands for available
      },
    });
    console.log(availableRoom)
    if (!availableRoom) {
      res.status(400).json({ message: 'The room is not available' });
      return;
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        b_cost: price,
        b_outstanding: 0,
        roomBookings: {
          create: {
            r_no: availableRoom.r_no, // Use the available room number from the query result
            checkin,
            checkout,
          },
        },
        b_notes: "",
        customer: {
          connect: {
            c_no: c_no, // Connecting to an existing customer
          },
        },
      },
      include: {
        roomBookings: true,
      },
    });

    
    await prisma.room.update({
      where: {
        r_no: parseInt(r_no),
      },
      data: {
        r_status: 'X', 
      },
    });
  
    res.status(200).json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
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

const me = async (req, res) =>  {
  res.send(req.user);
}

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
  me
};
