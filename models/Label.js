const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Label extends Model {}

Label.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'label',
  }
);

module.exports = Label;
