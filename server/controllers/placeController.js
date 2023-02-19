const Place = require("../../models/Place");
const PlaceProperties = require("../../models/PlaceProperties");
const { RateError } = require("../../Errors");
const Rate = require("../../models/Rate");
const { addLocation } = require("./locationController");
const User = require("../../models/User");

const getAll = async (req, res, next) => {
  try {
    const places = await Place.findAll({
      include: {
        model: PlaceProperties,
      },
    });

    if (places) {
      return res.status(201).json({ places });
    }
  } catch (error) {
    error.message = "Couldn't get any place";
    error.code = 404;
    next(error);
  }
};
// { "title": "Cafe 2", "email": "cafe@cafe.com", "phone": "0132546865", "parking": false, "ramp": true, "elevator": false, "toilet": true, "floor": 2 }
const addPlace = async (req, res) => {
  const {
    title,
    email,
    phone,
    parking,
    ramp,
    elevator,
    toilet,
    floor,
    img,
    lat,
    lng,
  } = req.body;

  const place = await Place.create({
    title: title.toLowerCase(),
    email,
    phone,
    img,
  });
  const placeProperties = await PlaceProperties.create({
    placeId: place.id,
    parking,
    ramp,
    elevator,
    toilet,
    floor,
  });

  addLocation(place.id, lat, lng);

  res.status(201).json({ place, placeProperties });
};

const getPlaceByTitle = async (title) => {
  const place = await Place.findOne({ where: { title: title } });

  if (place) {
    return true;
  }
  return false;
};

const updateRate = async (placeId, newRate) => {
  try {
    await Place.update(
      { rate: Math.round(newRate) },
      {
        where: {
          id: placeId,
        },
      }
    );
  } catch (error) {
    throw new RateError("Error updating rate in place table", 400);
  }
};

const deletePlace = async (req, res) => {

  const place = await Place.findByPk(req.params.placeId, { include:  User });

  if (place) {
    const users = await place.getUsers();
    if (users.length > 0) {
      await place.setUsers([]);
    }
    await place.destroy();
    res.status(201).json({ status: "success", message: "Deleted" });
  } else {
    res.status(404).send("Place not found");
  }
};

module.exports = { getAll, addPlace, getPlaceByTitle, updateRate, deletePlace };
