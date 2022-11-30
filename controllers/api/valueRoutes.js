const router = require('express').Router();
const { Value } = require('../../models');
const withAuth = require('../../utils/authHelpers');

// Update a value, only with logged in users.
router.put('/:id', withAuth, async (req, res) => {});

// Delete value, ONLY ADMIN.
router.delete('/:id', async (req, res) => {});

// Bulk create values, only with logged in users.
router.post('/bulk', withAuth, async (req, res) => {});

//Export the file.
module.exports = router;
