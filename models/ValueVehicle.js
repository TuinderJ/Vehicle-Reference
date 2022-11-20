const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ValueVehicle extends Model {}

ValueVehicle.init(
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
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'value_vehicle',
  }
);

module.exports = ValueVehicle;
