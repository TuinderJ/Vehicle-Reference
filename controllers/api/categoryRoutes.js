const router = require('express').Router();
const { Category, Label } = require('../../models');
const withAuth = require('../../utils/auth');
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
    res.status(500).json(err);
  }
});

// Create a new category, only with logged in users.
router.post('/', withAuth, async (req, res) => {
  try {
    const { category, labels } = req.body;
    const addedCategory = await Category.create({ category });

    const { id: categoryId } = addedCategory;
    const newLabels = labels.map((label) => ({ categoryId, label }));

    const addedLabels = await Label.bulkCreate(newLabels);

    res.status(200).json({ addedCategory, addedLabels });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update category, only logged in users.
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { category } = req.body;
    const id = req.params.id;
    const changedCategory = await Category.update(
      { category },
      { where: { id } }
    );

    changedCategory[0]
      ? res.status(200).json({ id, category })
      : res.status(404).json('category not found or no changes made');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete category, ONLY ADMIN.
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await Category.destroy({ where: { id } });
    deletedCategory
      ? res.status(200).json(deletedCategory)
      : res.status(404).json('category not found');
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export the file.
module.exports = router;
