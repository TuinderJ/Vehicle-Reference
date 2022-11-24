const sequelize = require('../config/connection');
const {
  User,
  Category,
  Vehicle,
  Label,
  Value,
  ValueVehicle,
  VehicleCategory,
} = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const vehicleData = require('./vehicleData.json');
const vehicleCategoryData = require('./vehicleCategoryData.json');
const labelData = require('./labelData.json');
const valueData = require('./valueData.json');
const valueVehicleData = require('./valueVehicleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  await Category.bulkCreate(categoryData);
  await Vehicle.bulkCreate(vehicleData);
  await Label.bulkCreate(labelData);
  await Value.bulkCreate(valueData);
  await ValueVehicle.bulkCreate(valueVehicleData);
  await VehicleCategory.bulkCreate(vehicleCategoryData);

  process.exit(0);
};

seedDatabase();
