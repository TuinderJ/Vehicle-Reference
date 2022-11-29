const { Category, Label } = require('../../models');
const { isLoggedIn, isAdmin } = require('./authHelpers');

const getCategory = async () => {
  if (!isLoggedIn()) return { loggedIn: false };
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Label,
        attributes: {
          exclude: 'categoryId',
        },
      },
    });
    return categoryData;
  } catch (err) {
    console.log(err);
    return 'No category found';
  }
};

const createCategory = async () => {
  if (!isLoggedIn()) return { loggedIn: false };
  try {
    const { category, labels } = req.body;
    const addedCategory = await Category.create({ category });

    const { id: categoryId } = addedCategory;
    const newLabels = labels.map((label) => ({ categoryId, label }));

    const addedLabels = await Label.bulkCreate(newLabels);

    return { addedCategory, addedLabels };
  } catch (err) {
    console.log(err);
    return 'No category found';
  }
};

const updateCategory = async () => {
  if (!isLoggedIn()) return { loggedIn: false };
  try {
    const { category } = req.body;
    const id = req.params.id;
    const changedCategory = await Category.update({ category }, { where: { id } });

    if (changedCategory[0]) {
      return { id, category };
    } else {
      return 'Category not found or no changes made';
    }
  } catch (err) {
    return 'No category found';
  }
};

const deleteCategory = async () => {
  if (!isAdmin()) return { loggedIn: false };
  try {
    const id = req.params.id;
    const deletedCategory = await Category.destroy({ where: { id } });

    if (deletedCategory) {
      return 'deletedCategory';
    } else {
      return 'Category not found';
    }
  } catch (err) {
    return 'No category found';
  }
};

module.exports = { getCategory, createCategory, updateCategory, deleteCategory };
