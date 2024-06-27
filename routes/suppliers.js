// routes/suppliers.js

const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');
const { authenticate, authorize } = require('../middleware/auth');

// Create a new supplier
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { supplierName, contactName, address, city, postalCode, country, phone } = req.body;
    const supplier = await Supplier.create({ supplierName, contactName, address, city, postalCode, country, phone });
    res.status(201).json(supplier);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ message: error.message });
  }
});

// Get all suppliers
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
    try {
      const suppliers = await Supplier.findAll();
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update a supplier
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
      const supplier = await Supplier.findByPk(id);
      if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
      const { supplierName, contactName, address, city, postalCode, country, phone } = req.body;
      await supplier.update({ supplierName, contactName, address, city, postalCode, country, phone });
      res.json(supplier);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete a supplier
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
      const supplier = await Supplier.findByPk(id);
      if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
      await supplier.destroy();
      res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
