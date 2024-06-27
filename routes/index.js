const express = require('express');
const router = express.Router();

// Rute untuk halaman beranda, mengembalikan JSON
router.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to My App' });
});

module.exports = router;
