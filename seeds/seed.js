const sequelize = require('../config/connection');
const {
  User,
  Category,
  Vehicle,
  Label,
  Value,
  ValueLabelVehicle,
} = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const vehicleData = require('./vehicleData.json');
const labelData = require('./labelData.json');
const valueData = require('./valueData.json');
const valueLabelVehicleData = require('./valueLabelVehicleData.json');

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
  await ValueLabelVehicle.bulkCreate(valueLabelVehicleData);

  process.exit(0);
};

seedDatabase();
