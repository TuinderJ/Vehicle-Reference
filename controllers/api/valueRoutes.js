const router = require('express').Router();
const { Value } = require('../../models');
const withAuth = require('../../utils/auth');
const adminAuth = require('../../utils/adminauth');

// Update a value, only with logged in users.
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { value } = req.body;
    const id = req.params.id;

    const updatedvalue = await Value.update({ value }, { where: { id } });

    updatedvalue[0]
      ? res.status(200).json({ id, value })
      : res.status(404).json('value not found or no updates');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete value, ONLY ADMIN.
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedvalue = await Value.destroy({ where: { id } });
    deletedvalue ? res.status(200).json('value deleted') : res.status(404).json('value not found');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Bulk create values, only with logged in users.
router.post('/bulk', withAuth, async (req, res) => {
  try {
    const newValues = await Value.bulkCreate(req.body);
    newValues[0] ? res.status(200).json(newValues) : res.status(400).send();
  } catch (error) {
    res.status(500).send();
  }
});

//Export the file.
module.exports = router;
