const { Vehicle, Category, Value, Label, VehicleCategory } = require('../models');
const { isLoggedIn } = require('./authHelpers');
const { bulkCreateValues, bulkUpdateValues } = require('./valueHelpers');

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
    return 'No vehicle found';
  }
};

const createVehicle = async ({ req, unitNumber, customerUnitNumber, vin, categories, values }) => {
  if (!isLoggedIn({ req })) return { loggedIn: false };
  try {
    const newVehicle = { unitNumber, customerUnitNumber, vin };

    const addedVehicle = await Vehicle.create(newVehicle);

    const { id: vehicleId } = addedVehicle;

    const newCategories = categories.map((categoryId) => ({ cVehicleId: vehicleId, categoryId }));
    const newValues = values.map(({ labelId, value }) => ({ value, labelId, vehicleId }));

    VehicleCategory.bulkCreate(newCategories);
    Value.bulkCreate(newValues);
    return addedVehicle;
  } catch (err) {
    console.log(err);
    return { err };
  }
};

const updateVehicle = async ({
  req,
  id,
  unitNumber,
  customerUnitNumber,
  vin,
  categories,
  values,
}) => {
  if (!isLoggedIn({ req })) return { loggedIn: false };
  try {
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

    const created = await bulkCreateValues({ req, newValues });
    const updated = await bulkUpdateValues({ req, valuesToUpdate });

    if (updateVehicle) {
      return 'vehicle updated';
    } else {
      return 'vehicle not found or no updates';
    }
  } catch (err) {
    return { err };
  }
};

const deleteVehicle = async ({ id, req }) => {
  if (!isLoggedIn({ req })) return { loggedIn: false };
  try {
    const deleteVehicle = await Vehicle.destroy({
      where: { id },
    });

    if (!deleteVehicle) {
      return 'No vehicle found with this id!';
    } else {
      return deleteVehicle;
    }
  } catch (err) {
    return { err };
  }
};

module.exports = { getVehicle, createVehicle, updateVehicle, deleteVehicle };
