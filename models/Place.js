const Sequelize = require("sequelize");
const PlaceProperties = require("./PlaceProperties");
const sequelize = require("../config/database");
const Location = require("./Location");

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
      type: Sequelize.DataTypes.BIGINT,
    },
    rate: {
      type: Sequelize.DataTypes.DOUBLE,
      defaultValue: 0,
    },
    img: {
      type: Sequelize.DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

Place.beforeDestroy(async (place, options) => {
  await PlaceProperties.destroy({
    where: { placeId: place.id },
    transaction: options.transaction,
  });
});

Place.beforeDestroy(async (place, options) => {
  await Location.destroy({
    where: { placeId: place.id },
    transaction: options.transaction,
  });
});

module.exports = Place;
