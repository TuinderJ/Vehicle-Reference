const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ValueLabelVehicle extends Model {}

ValueLabelVehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    valueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    labelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'value_label_vehicle',
  }
);

module.exports = ValueLabelVehicle;
