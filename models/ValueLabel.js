const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ValueLabel extends Model {}

ValueLabel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    lValueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    labelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'value_label',
  }
);

module.exports = ValueLabel;
