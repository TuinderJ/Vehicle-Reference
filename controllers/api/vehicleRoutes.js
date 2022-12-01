const router = require('express').Router();
const {
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../../utils/vehicleHelpers');

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
  const { unitNumber, customerUnitNumber, vin, categories, values } = req.body;
  const response = await createVehicle({
    req,
    unitNumber,
    customerUnitNumber,
    vin,
    categories,
    values,
  });
  response.err ? res.json(response.err.errors[0].message) : res.json('good');
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
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

// Delete vehicle, ONLY ADMIN.
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  deleteVehicle({ id, req });
  res.json('deleted');
});

// Export the file.
module.exports = router;
