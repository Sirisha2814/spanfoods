// authController.js
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = asyncHandler(async (req, res) => {
  const { username, email, empid, password, isAdmin } = req.body;
  if (!username || !email || !empid || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const userExists1 = await User.findOne({ empid });
  if (userExists1) {
    res.status(400);
    throw new Error('User with Same Employee ID Already Exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    empid,
    email,
    password: hashedPassword,
    isAdmin,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      empid: user.empid,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const login = asyncHandler(async (req, res) => {
  const { empid, email, password } = req.body;
  if (!email || !empid || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const existingUser = await User.findOne({ $and: [{ email }, { empid }] });

  if (!existingUser) {
    res.status(401);
    throw new Error('Email and Employee Id Do Not Match');
  }

  if (empid !== existingUser.empid) {
    res.status(401);
    throw new Error('Invalid Employee ID');
  }

  if (await bcrypt.compare(password, existingUser.password)) {
    const token = generateToken(existingUser._id);

    // Admin-specific logic
    if (existingUser.isAdmin) {
      // console.log('Admin login');
      // Add admin-specific tasks or customize the response for admin users
    }

    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.username,
      empid: existingUser.empid,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid password');
  }
});

const JWT_SECRET = 'abc123';
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  register,
  login,
};
