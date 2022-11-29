const router = require('express').Router();
const { Label } = require('../../models');
const withAuth = require('../../utils/auth');
const adminAuth = require('../../utils/adminauth');

// Update a label, only with logged in users.
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { label } = req.body;
    const id = req.params.id;

    const updatedLabel = await Label.update({ label }, { where: { id } });

    updatedLabel[0]
      ? res.status(200).json({ id, label })
      : res.status(404).json('label not found or no updates');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete label, ONLY ADMIN.
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedLabel = await Label.destroy({ where: { id } });
    deletedLabel
      ? res.status(200).json('label deleted')
      : res.status(404).json('label not found');
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export the file.
module.exports = router;
