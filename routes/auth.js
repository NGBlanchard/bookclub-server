const express = require("express");
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { JWT_SECRET } = config;
const authRoutes = express.Router();

/**
 * @route   POST auth/
 * @desc    Login user
 * @access  Public
 */

authRoutes.post('/', async (req, res) => {
  const { username, password } = req.body;
  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) throw Error('User Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        profile_img: user.profile_img,
        current: user.current,
        description: user.description,
        progress: user.progress,
        website: user.website,
        following: user.following,
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

authRoutes.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ username });
    if (user) throw Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const id =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

    const newUser = new User({
      id,
      username,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        username: savedUser.username,
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = authRoutes;