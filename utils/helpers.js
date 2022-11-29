const { Vehicle, Category, Value, Label } = require('../models');

const getVehicle = async ({ unitNumber, customerUnitNumber, vin, last8 }) => {
  try {
    if (!unitNumber && !customerUnitNumber && !vin && !last8) {
      return 'Provide something to search for.';
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
      return 'The vehicle searched for is not found.';
    }

    for (let i = 0; i < vehicleData.length; i++) {
      const vehicle = vehicleData[i];
      const id = vehicle.id;
      const valueData = await Vehicle.findAll({
        where: { id },
        attributes: {
          exclude: [Vehicle],
        },
        include: { model: Value },
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

    return vehicleData[0];
  } catch (err) {
    console.log(err);
    return 'No vehicle found';
  }
};

const createVehicle = async () => {
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
};

module.exports = { getVehicle };