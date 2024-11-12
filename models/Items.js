// models/Item.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');
const Supplier = require('./Supplier');
const Admin = require('./Admin');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Relasi antar tabel
Item.belongsTo(Category, { foreignKey: 'category_id' });
Item.belongsTo(Supplier, { foreignKey: 'supplier_id' });
Item.belongsTo(Admin, { foreignKey: 'created_by' });

module.exports = Item;
