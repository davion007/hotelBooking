// index.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

dotenv.config();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const customerRoutes = require('./routes/customer');
const receptionRoutes = require('./routes/reception');
const housekeepingRoutes = require('./routes/housekeeping');

// Use routes
app.use('/customer', customerRoutes);
app.use('/reception', receptionRoutes);
app.use('/housekeeping', housekeepingRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


