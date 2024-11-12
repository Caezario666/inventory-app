// routes/api.js
const express = require('express');
const { Admin, Item, Supplier, Category } = require('../models');
const sequelize = require('sequelize');
const router = express.Router();

// CRUD Item
router.post('/items', async (req, res) => {
  const { name, description, price, quantity, category_id, supplier_id, created_by } = req.body;
  try {
    const item = await Item.create({ name, description, price, quantity, category_id, supplier_id, created_by });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
});

router.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [Category, Supplier, Admin],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items", error });
  }
});

// CRUD Category
router.post('/categories', async (req, res) => {
  const { name, description, created_by } = req.body;
  try {
    const category = await Category.create({ name, description, created_by });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories", error });
  }
});

// CRUD Supplier
router.post('/suppliers', async (req, res) => {
  const { name, contact_info, created_by } = req.body;
  try {
    const supplier = await Supplier.create({ name, contact_info, created_by });
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error creating supplier", error });
  }
});

router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving suppliers", error });
  }
});

// Ringkasan Stok Barang
router.get('/stock-summary', async (req, res) => {
  try {
    const stockSummary = await Item.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('price')), 'total_value'],
        [sequelize.fn('SUM', sequelize.col('quantity')), 'total_stock'],
        [sequelize.fn('AVG', sequelize.col('price')), 'avg_price'],
      ],
    });
    res.json(stockSummary);
  } catch (error) {
    res.status(500).json({ message: "Error generating stock summary", error });
  }
});

// Barang Stok di Bawah Ambang Batas
router.get('/low-stock-items', async (req, res) => {
  const threshold = 5;  // Ambang batas stok
  try {
    const lowStockItems = await Item.findAll({
      where: {
        quantity: { [sequelize.Op.lt]: threshold },
      },
    });
    res.json(lowStockItems);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving low stock items", error });
  }
});

// Laporan Barang Berdasarkan Kategori
router.get('/items-by-category/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const items = await Item.findAll({
      where: { category_id: categoryId },
      include: [Category],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items by category", error });
  }
});

// Ringkasan Per Kategori
router.get('/category-summary', async (req, res) => {
  try {
    const categorySummary = await Category.findAll({
      include: [
        {
          model: Item,
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'item_count'],
            [sequelize.fn('SUM', sequelize.col('price')), 'total_value'],
            [sequelize.fn('AVG', sequelize.col('price')), 'avg_price'],
          ],
        },
      ],
    });
    res.json(categorySummary);
  } catch (error) {
    res.status(500).json({ message: "Error generating category summary", error });
  }
});

module.exports = router;
