const User = require('./User');
const Category = require('../models/Category');
const Vehicle = require('../models/Vehicle');
const Label = require('../models/Label');
const Value = require('../models/Value');
const ValueLabel = require('../models/ValueLabel');
const ValueVehicle = require('../models/ValueVehicle');
const VehicleCategory = require('../models/VehicleCategory');
const sequelize = require('../config/connection');

Category.hasMany(Label, { foreignKey: 'categoryId' });
Label.belongsTo(Category);

Vehicle.belongsToMany(Category, {
  through: VehicleCategory,
  foreignKey: 'vehicleId',
});
Category.belongsToMany(Vehicle, {
  through: VehicleCategory,
  foreignKey: 'categoryId',
});

Label.belongsToMany(Value, {
  through: ValueLabel,
  foreignKey: 'labelId',
});
Value.belongsToMany(Label, {
  through: ValueLabel,
  foreignKey: 'lValueId',
});

Vehicle.belongsToMany(Value, {
  through: ValueVehicle,
  foreignKey: 'vehicleId',
});
Value.belongsToMany(Vehicle, {
  through: ValueVehicle,
  foreignKey: 'valueId',
});

module.exports = {
  User,
  Category,
  Vehicle,
  Label,
  Value,
  ValueLabel,
  ValueVehicle,
  VehicleCategory,
};
