const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/orderDetail');
const { authenticate, authorize } = require('../middleware/auth');

// Create a new order detail
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { orderID, productID, quantity } = req.body;
    const orderDetail = await OrderDetail.create({ orderID, productID, quantity });
    res.status(201).json(orderDetail);
  } catch (err) {
    console.error(err);
    next(err); // Meneruskan kesalahan ke middleware penangan kesalahan global
  }
});

// Get all order details
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const orderDetails = await OrderDetail.findAll();
    res.json(orderDetails);
  } catch (err) {
    next(err); // Meneruskan kesalahan ke middleware penangan kesalahan global
  }
});

// Update an order detail
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  const { id } = req.params;
  try {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) return res.status(404).json({ message: 'Order detail not found' });
    const { orderID, productID, quantity } = req.body;
    await orderDetail.update({ orderID, productID, quantity });
    res.json(orderDetail);
  } catch (err) {
    next(err); // Meneruskan kesalahan ke middleware penangan kesalahan global
  }
});

// Delete an order detail
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  const { id } = req.params;
  try {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) return res.status(404).json({ message: 'Order detail not found' });
    await orderDetail.destroy();
    res.json({ message: 'Order detail deleted successfully' });
  } catch (err) {
    next(err); // Meneruskan kesalahan ke middleware penangan kesalahan global
  }
});

module.exports = router;
