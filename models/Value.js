const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Value extends Model {}

Value.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'value',
  }
);

module.exports = Value;
