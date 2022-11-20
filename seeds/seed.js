const sequelize = require('../config/connection');
const {
  User,
  Category,
  Vehicle,
  Label,
  Value,
  ValueLabel,
  ValueVehicle,
  VehicleCategory,
} = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const vehicleData = require('./vehicleData.json');
const vehicleCategoryData = require('./vehicleCategoryData.json');
const labelData = require('./labelData.json');
const valueData = require('./valueData.json');
const valueLabelData = require('./valueLabelData.json');
const valueVehicleData = require('./valueVehicleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Category.bulkCreate(categoryData);
  await Vehicle.bulkCreate(vehicleData);
  await Label.bulkCreate(labelData);
  await Value.bulkCreate(valueData);
  await ValueLabel.bulkCreate(valueLabelData);
  await ValueVehicle.bulkCreate(valueVehicleData);
  await VehicleCategory.bulkCreate(vehicleCategoryData);

  process.exit(0);
};

seedDatabase();
