const router = require('express').Router();
const { Vehicle, Category, Label, Value, VehicleCategory } = require('../../models');
const withAuth = require('../../utils/authHelpers');
const { Op } = require('sequelize');
const adminAuth = require('../../utils/adminauth');
const { default: axios } = require('axios');

router.get('/', async (req, res) => {});

// Create a new vehicle, only admin and logged in users.
router.post('/', withAuth, async (req, res) => {});

// Update vehicle, only admin and logged in users.
router.put('/:id', withAuth, async (req, res) => {});

// Delete vehicle, ONLY ADMIN.
router.delete('/:id', adminAuth, async (req, res) => {});

// Export the file.
module.exports = router;
