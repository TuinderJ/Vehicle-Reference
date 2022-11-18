const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CategoryLabel extends Model {}

CategoryLabel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
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
    modelName: 'category_label',
  }
);

module.exports = CategoryLabel;
