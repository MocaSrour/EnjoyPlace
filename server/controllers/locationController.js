const Location = require("../../models/Location");

const getLocation = async (req, res, next) => {
    try {
      const location = await Location.findAll({
        where: {placeId: req.params.placeId}
      });
  
      if (location) {
        return res.status(201).json({ location });
      }
    } catch (error) {
      error.message = "Couldn't get location";
      error.code = 404;
      next(error);
    }
  };

  const addLocation = async (placeId, lat, lng) => await Location.create({ placeId, lat, lng });
  

  module.exports = { getLocation, addLocation }