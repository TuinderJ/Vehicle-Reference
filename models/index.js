const User = require('./User');
const Category = require('../models/Category');
const Vehicle = require('../models/Vehicle');
const Label = require('../models/Label');
const Value = require('../models/Value');
const ValueVehicle = require('../models/ValueVehicle');
const VehicleCategory = require('../models/VehicleCategory');

Category.hasMany(Label, { foreignKey: 'categoryId' });
Label.belongsTo(Category);

// Comment this for seeding
Vehicle.belongsToMany(Category, {
  through: VehicleCategory,
  foreignKey: 'vehicleId',
});

Vehicle.belongsToMany(Value, {
  through: ValueVehicle,
  foreignKey: 'vehicleId',
});
Value.belongsToMany(Vehicle, {
  through: ValueVehicle,
  foreignKey: 'valueId',
});
// // Comment this for seeding

module.exports = {
  User,
  Category,
  Vehicle,
  Label,
  Value,
  ValueVehicle,
  VehicleCategory,
};
