const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Rate = require("./Rate");
const Place = require("./Place");
const Location = require("./Location");
const PlaceProperties = require("./PlaceProperties");
const rateController = require('../server/controllers/rateController');

User.belongsToMany(Place, { through: Rate });
Place.belongsToMany(User, { through: Rate });


Location.belongsTo(Place);
Place.hasOne(Location);
PlaceProperties.belongsTo(Place);
Place.hasOne(PlaceProperties);

// sequelize.sync()
// .then(() => console.log('Tables built Successfully'))
//     .catch(err => console.log(err));

// Get PLACE BY ID
Place.getPlaceById = async (req, res) => {
  
  const place = await Place.findOne({ where: { id: req.body.placeId } });

  const placeProperties = await PlaceProperties.findOne({
    where: { placeId: req.body.placeId },
  });

  const rates = await rateController.findAllRates(req.body.placeId);

  if (place && placeProperties) {
    return res.json({ place, placeProperties, rates });
  }
  throw Error("Place does not exist");
};

module.exports = { User, Place, Rate, Location, PlaceProperties };
