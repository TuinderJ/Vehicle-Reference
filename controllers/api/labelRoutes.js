const router = require('express').Router();
const { Label } = require('../../models');
const withAuth = require('../../utils/authHelpers');
const adminAuth = require('../../utils/adminauth');

// Update a label, only with logged in users.
router.put('/:id', withAuth, async (req, res) => {});

// Delete label, ONLY ADMIN.
router.delete('/:id', adminAuth, async (req, res) => {});

//Export the file.
module.exports = router;
