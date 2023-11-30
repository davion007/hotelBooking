// index.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Routers
const customerRouter = require('./src/routers/customerRouter');
const roomRouter = require('./src/routers/roomRouter');
const bookingRouter = require('./src/routers/bookingRouter');
const roomBookingRouter = require('./src/routers/roomBookingRouter');

app.use('/api/customers', customerRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/roombookings', roomBookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
