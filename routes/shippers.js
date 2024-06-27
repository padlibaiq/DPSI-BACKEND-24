// routes/shippers.js

const express = require('express');
const router = express.Router();
const Shipper = require('../models/shipper');
const { authenticate, authorize } = require('../middleware/auth');

// Create a new shipper
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { shipperName, phone } = req.body;
    const shipper = await Shipper.create({ shipperName, phone });
    res.status(201).json(shipper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all shippers
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
    try {
      const shippers = await Shipper.findAll();
      res.json(shippers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update a shipper
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
      const shipper = await Shipper.findByPk(id);
      if (!shipper) return res.status(404).json({ message: 'Shipper not found' });
      const { shipperName, phone } = req.body;
      await shipper.update({ shipperName, phone });
      res.json(shipper);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete a shipper
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
      const shipper = await Shipper.findByPk(id);
      if (!shipper) return res.status(404).json({ message: 'Shipper not found' });
      await shipper.destroy();
      res.json({ message: 'Shipper deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
