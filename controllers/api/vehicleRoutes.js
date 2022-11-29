const router = require('express').Router();
const { Vehicle, Category, Label, Value, VehicleCategory } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');
const adminAuth = require('../../utils/adminauth');
const { default: axios } = require('axios');

router.get('/', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    if (!unitNumber && !customerUnitNumber && !vin && !last8) {
      return res.status(400).json({ message: 'Provide something to search for.' });
    }
    let searchTerm = null;
    if (unitNumber) {
      searchTerm = { unitNumber };
    } else if (customerUnitNumber) {
      searchTerm = { customerUnitNumber };
    } else if (vin) {
      searchTerm = { vin };
    } else if (last8) {
      searchTerm = { vin: { [Op.endsWith]: last8 } };
    }

    const data = await Vehicle.findAll({
      where: { ...searchTerm },
      include: {
        model: Category,
        attributes: {
          exclude: ['vehicleCategory'],
        },
        include: {
          model: Label,
          attributes: {
            exclude: ['categoryId'],
          },
        },
      },
    });

    const vehicleData = data.map((vehicle) => vehicle.get({ plain: true }));

    if (!vehicleData[0]) {
      return res.status(404).json({ message: 'The vehicle searched for is not found.' });
    }

    for (let i = 0; i < vehicleData.length; i++) {
      const vehicle = vehicleData[i];
      const id = vehicle.id;
      const valueData = await Vehicle.findAll({
        where: { id },
        attributes: {
          exclude: [Vehicle],
        },
        include: {
          model: Value,
          attributes: {
            exclude: ['value_vehicle'],
          },
        },
      });

      for (let ii = 0; ii < vehicle.categories.length; ii++) {
        const category = vehicle.categories[ii];

        for (let iii = 0; iii < category.labels.length; iii++) {
          const label = category.labels[iii];

          valueData[0].values.forEach(({ id, value, labelId }) => {
            if (label.id === labelId) label['values'] = [{ id, value }];
          });
        }
      }
    }

    res.json(vehicleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new vehicle, only admin and logged in users.
router.post('/', withAuth, async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, categories, values } = req.body;
    const newVehicle = { unitNumber, customerUnitNumber, vin };

    const addedVehicle = await Vehicle.create(newVehicle);

    const { id: vehicleId } = addedVehicle;

    const newCategories = categories.map((categoryId) => ({ cVehicleId: vehicleId, categoryId }));
    const newValues = values.map(({ labelId, value }) => ({ value, labelId, vehicleId }));

    VehicleCategory.bulkCreate(newCategories);
    Value.bulkCreate(newValues);
    res.status(200).json(addedVehicle);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: Update vehicle, only admin and logged in users.
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { unitNumber, customerUnitNumber, vin, categories, values } = req.body;
    const newVehicleData = { unitNumber, customerUnitNumber, vin };

    const updateVehicle = await Vehicle.update(newVehicleData, { where: { id } });

    const currentCategories = await VehicleCategory.findAll({ where: { cVehicleId: id } });
    const currentCategoryIds = currentCategories.map(({ categoryId }) => categoryId);

    const newCategories = [];
    categories.forEach((categoryId) => {
      if (!currentCategoryIds.includes(categoryId))
        newCategories.push({ cVehicleId: id, categoryId });
    });

    VehicleCategory.bulkCreate(newCategories);

    const valuesToUpdate = [];
    const newValues = [];

    values.forEach(({ id: valueId, labelId, value }) => {
      valueId
        ? valuesToUpdate.push({ id: valueId, labelId, value })
        : newValues.push({ vehicleId: id, labelId, value });
    });

    // axios.put('/api/value/bulk', valuesToUpdate)
    // const response = await axios.get('/');
    // console.log(response);

    updateVehicle
      ? res.status(200).json('vehicle updated')
      : res.status(404).json('vehicle not found or no updates');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete vehicle, ONLY ADMIN.
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVehicle = await Vehicle.destroy({
      where: { id },
    });

    !deleteVehicle
      ? res.status(404).json({ message: 'No vehicle found with this id!' })
      : res.status(200).json(deleteVehicle);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the file.
module.exports = router;
