const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const { calculateRate } = require("../server/middlewares/calculateRate");

const Rate = sequelize.define(
  "rate",
  {
    rate: {
      type: Sequelize.DataTypes.DOUBLE,
    },
    comment: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Rate;