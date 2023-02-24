const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Rate = require("./Rate");
const Place = require("./Place");
const Location = require("./Location");
const PlaceProperties = require("./PlaceProperties");
const rateController = require("../server/controllers/rateController");
const { RateError } = require("../Errors");
User.belongsToMany(Place, { through: Rate });
Place.belongsToMany(User, { through: Rate });
Rate.belongsTo(User);
Rate.belongsTo(Place);

Location.belongsTo(Place);
Place.hasOne(Location, { onDelete: "CASCADE" });
PlaceProperties.belongsTo(Place);
Place.hasOne(PlaceProperties, { onDelete: "CASCADE" });

// Create a super Admin account
// const creatAdmin = async () =>
//   await User.create({
//     userName: Admin,
//     email: "admin@places.enjoy",
//     password: "mypassword",
//     role: "Admin",
//   });
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Tables built Successfully");
//     creatAdmin();
//     console.log(
//       "Your user is registered now, you can use the website with this user account, email: admin@places.enjoy password: mypassword , Dont forget to comment lines from 21 to 37 in models/index.js file, please."
//     );
//   })
//   .catch((err) => console.log(err));

// Get PLACE BY ID
Place.getPlaceById = async (req, res, next) => {
  try {
    try {
      const place = await Place.findOne({
        include: {
          model: PlaceProperties,
        },
        where: { id: req.params.placeId },
      });

      const rates = await rateController.findAllRates(req.params.placeId);

      if (place) {
        res.status(201).json({ place, rates });
      }
    } catch (error) {
      if (error instanceof RateError) {
        throw error;
      }
      throw new RateError("Error while getting place", 404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { User, Place, Rate, Location, PlaceProperties };
