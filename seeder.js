const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    await User.deleteMany(); // Xoá user cũ nếu cần

    const hashedPassword = await bcrypt.hash('123456', 10);

    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log('✅ Admin user created');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
