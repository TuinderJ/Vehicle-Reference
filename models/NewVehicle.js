const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class NewVehicle extends Model {}

NewVehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    unitNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    customerUnitNumber: {
      type: DataTypes.STRING,
    },
    customerName: {
        type: DataTypes.STRING,
      },
    unitType: {
        type: DataTypes.STRING,
      },
    mobileService: {
        type: DataTypes.STRING,
      },
    VIN: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    modelYear: {
        type: DataTypes.STRING,
      },
    vehicleMake: {
        type: DataTypes.STRING,
      },
    vehicleModel: {
        type: DataTypes.STRING,
      },
    engineMake: {
        type: DataTypes.STRING,
      },
    engineModel: {
        type: DataTypes.STRING,
      },
    EngSN: {
        type: DataTypes.STRING,
      },
    aftertreatmentNumber: {
        type: DataTypes.STRING,
      },
    DPF: {
        type: DataTypes.STRING,
      },
    SCR: {
        type: DataTypes.STRING,
      },
      Centrifugal: {
        type: DataTypes.STRING,
      },
      oilFilter: {
        type: DataTypes.STRING,
      },
      fuelFilter: {
        type: DataTypes.STRING,
      },
      Fuel_Water_Seperator:  {
        type: DataTypes.STRING,
      },
      cabinAirFilter: {
        type: DataTypes.STRING,
      },
      engineAirFilter: {
        type: DataTypes.STRING,
      },
      steerTires: {
        type: DataTypes.STRING,
      },
      additionalTires: {
        type: DataTypes.STRING,
      },
      driveTires: {
        type: DataTypes.STRING,
      },
      staticAcleMake: {
        type: DataTypes.STRING,
      },
      staticAxlePN: {
        type: DataTypes.STRING,
      },
      liftAxleMake: {
        type: DataTypes.STRING,
      },
      liftAxlePN: {
        type: DataTypes.STRING,
      },
      liftgateMake: {
        type: DataTypes.STRING,
      },
      liftgateModel: {
        type: DataTypes.STRING,
      },
      liftgateSN: {
        type: DataTypes.STRING,
      },
      liftgateCapacity: {
        type: DataTypes.STRING,
      },
      liftgatePower_GravityDown:  {
        type: DataTypes.STRING,
      },
      reeferMake: {
        type: DataTypes.STRING,
      },
      reeferModel: {
        type: DataTypes.STRING,
      },
   reeferSN: {
    type: DataTypes.STRING,
  },
   reeferOilFilter: {
    type: DataTypes.STRING,
  },
   reeferFuelFilter:{
    type: DataTypes.STRING,
  },
   reeferSecondFuelFilter: {
    type: DataTypes.STRING,
  },
   reeferAirFilter: {
        type: DataTypes.STRING,
      },
   reeferBelt1: {
        type: DataTypes.STRING,
      },
   reeferBelt2: {
        type: DataTypes.STRING,
      },
   reeferBelt3: {
        type: DataTypes.STRING,
      },
   reeferBelt4: {
        type: DataTypes.STRING,
      },
   APUMake: {
        type: DataTypes.STRING,
      },
   APUModel: {
        type: DataTypes.STRING,
      },
   APUSN: {
        type: DataTypes.STRING,
      },
   APUOilFilter: {
        type: DataTypes.STRING,
      },
   APUFuelFilter: {
        type: DataTypes.STRING,
      },
   APUAirFilter:{
    type: DataTypes.STRING,
  },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'newVehicle',
  }
);

module.exports = NewVehicle;
