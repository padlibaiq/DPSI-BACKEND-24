const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware/auth');

// Rute pendaftaran
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    // Pastikan semua field yang dibutuhkan ada
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    // Cek apakah username sudah ada
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Buat user baru
    const newUser = await User.create({ username, password, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error creating user:', err); // Log error secara spesifik
    res.status(500).json({ message: 'Failed to register user' });
  }
});



// Rute login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

// Get All Users
router.get('/', authenticate, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get User by ID
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Update User by ID
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { username, password, role, profilePic } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.username = username || user.username;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;
    user.role = role || user.role;
    user.profilePic = profilePic || user.profilePic;
    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    next(err);
  }
});

// Delete User by ID
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
