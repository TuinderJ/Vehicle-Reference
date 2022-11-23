const User = require('./User');
const NewVehicle = require('./NewVehicle');
const Category = require('../models/Category');
// const Vehicle = require('../models/Vehicle');
// const Label = require('../models/Label');
// const Value = require('../models/Value');
// const ValueVehicle = require('../models/ValueVehicle');
// const VehicleCategory = require('../models/VehicleCategory');

User.hasMany(NewVehicle, {
  foreignKey: 'user_id',
});

// Category.hasMany(Label, { foreignKey: 'categoryId' });
// Label.belongsTo(Category);

// // Comment this for seeding
// Vehicle.belongsToMany(Category, {
//   through: VehicleCategory,
//   foreignKey: 'vehicleId',
// });
NewVehicle.belongsTo(Category, {
  foreignKey: 'category_id',
});

// NewVehicle.hasMany(Category, {
//   foreignKey: 'category_id',
// });

// Vehicle.belongsToMany(Value, {
//   through: ValueVehicle,
//   foreignKey: 'vehicleId',
// });
// Value.belongsToMany(Vehicle, {
//   through: ValueVehicle,
//   foreignKey: 'valueId',
// });
// Comment this for seeding

module.exports = {
  User,
  NewVehicle,
  Category,
  // Vehicle,
  // Label,
  // Value,
  // ValueVehicle,
  // VehicleCategory,
};
