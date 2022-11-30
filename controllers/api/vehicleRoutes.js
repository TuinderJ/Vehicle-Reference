const router = require('express').Router();
const withAuth = require('../../utils/authHelpers');
const { getVehicle, createVehicle, updateVehicle } = require('../../utils/vehicleHelpers');

router.get('/', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    const vehicle = await getVehicle({ unitNumber, customerUnitNumber, vin, last8 });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new vehicle, only admin and logged in users.
router.post('/', async (req, res) => {
  createVehicle();
});

// Update vehicle, only admin and logged in users.
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { unitNumber, customerUnitNumber, vin, categories, values } = req.body;
  try {
    const data = await updateVehicle({
      req,
      id,
      unitNumber,
      customerUnitNumber,
      vin,
      categories,
      values,
    });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Delete vehicle, ONLY ADMIN.
router.delete('/:id', async (req, res) => {});

// Export the file.
module.exports = router;
