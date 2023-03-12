const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const PlaceProperties = sequelize.define(
  "placeProperties",
  {
    parking: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
    ramp: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
    elevator: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
    floor: {
      type: Sequelize.DataTypes.INTEGER,
    },
    toilet: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = PlaceProperties;
