const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Place = sequelize.define(
  "place",
  {
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
    },
    phone: {
      type: Sequelize.DataTypes.INTEGER,
    },
    rate: {
      type: Sequelize.DataTypes.DOUBLE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Place;
