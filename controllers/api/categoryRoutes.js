const router = require('express').Router();
const { Category, Label } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');
const adminAuth = require('../../utils/adminauth');

// Get all categories and the labels belonging to them
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Label,
        attributes: {
          exclude: 'categoryId',
        },
      },
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create a new category, only with logged in users.
router.post('/', withAuth, async (req, res) => {
  try {
    const { category } = req.body;
    const addedCategory = Category.create({ category });
    res.status(200).json(addedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//TODO: Update category, only admin and logged in users.
router.put('/:id', withAuth, async (req, res) => {
  try {
    res.status(200).json(updateVehicle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//TODO: Delete category, ONLY ADMIN.
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    res.status(200).json(deleteVehicle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export the file.
module.exports = router;
