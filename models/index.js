const User = require('./User');
const Category = require('../models/Category');
const Vehicle = require('../models/Vehicle');
const Label = require('../models/Label');
const Value = require('../models/Value');
const VehicleCategory = require('../models/VehicleCategory');

Category.hasMany(Label, { foreignKey: 'categoryId' });
Label.belongsTo(Category);

Vehicle.hasMany(Value, { foreignKey: 'vehicleId' });
Value.belongsTo(Vehicle);

// Comment this for seeding
Vehicle.belongsToMany(Category, {
  through: VehicleCategory,
  foreignKey: 'cVehicleId',
});
// // Comment this for seeding

module.exports = {
  User,
  Category,
  Vehicle,
  Label,
  Value,
  VehicleCategory,
};
