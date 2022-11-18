const sequelize = require('../config/connection');
const { User } = require('../models');
const Category = require('../models/Category');
const Vehicle = require('../models/Vehicle');
const Label = require('../models/Label');
const Value = require('../models/Value');
const CategoryLabel = require('../models/CategoyLabel');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const vehicleData = require('./vehicleData.json');
const labelData = require('./labelData.json');
const valueData = require('./valueData.json');
const categoryLabelData = require('./categoryLabelData.json');

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
  await CategoryLabel.bulkCreate(categoryLabelData);

  process.exit(0);
};

seedDatabase();
