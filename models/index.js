const User = require('./User');
const Category = require('../models/Category');
const Vehicle = require('../models/Vehicle');
const Label = require('../models/Label');
const Value = require('../models/Value');
const ValueLabelVehicle = require('../models/ValueLabelVehicle');

Category.hasMany(Label, { foreignKey: 'category_id' });
Label.belongsTo(Category, { foreignKey: 'category_id' });

Label.belongsToMany(Value, {
  through: ValueLabelVehicle,
  foreignKey: 'label_id',
});
Value.belongsToMany(Label, {
  through: ValueLabelVehicle,
  foreignKey: 'value_id',
});

Vehicle.belongsToMany(Value, {
  through: ValueLabelVehicle,
  foreignKey: 'vehicle_id',
});
Value.belongsToMany(Vehicle, {
  through: ValueLabelVehicle,
  foreignKey: 'value_id',
});

module.exports = {
  User,
  Category,
  Vehicle,
  Label,
  Value,
  ValueLabelVehicle,
};
