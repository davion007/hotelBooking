require("dotenv").config();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.userAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Assuming you have a 'User' model in Prisma
      const user = await prisma.customer.findUnique({
        where: {
          c_no: decoded.id,
        }
      });

      if (!user) {
        return res.status(401).json({ message: "Not Auth" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Not Auth" });
    }
  } else {
    res.status(401).json({ message: "No Auth, No Token Found" });
  }
};
