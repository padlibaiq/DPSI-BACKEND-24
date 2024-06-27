const { DataTypes } = require('sequelize');
const sequelize = require('../models/index.js');

const Product = sequelize.define('Product', {
  productID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  supplierID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'products', // Ensure this matches your actual table name
  timestamps: false // If you don't want Sequelize to manage timestamps
});

module.exports = Product;
