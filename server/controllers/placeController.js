const Place = require('../../models/Place');
const PlaceProperties = require('../../models/PlaceProperties');
const Rate = require('../../models/Rate');

const getAll = async (req, res) => {

    const places = await Place.findAll();
    
    if (places) {
      return res.status(201).json({ places });
    }
    throw Error("No Places Found");
  };
  // { "title": "Cafe 2", "email": "cafe@cafe.com", "phone": "0132546865", "rate": 0, "parking": false, "ramp": true, "elevator": false, "toilet": true, "floor": 2 }
 const addPlace = async (req, res) => {
    const { title, email, phone, rate, parking, ramp, elevator, toilet, floor } =
      req.body;
  
    const place = await Place.create({ title, email, phone, rate });
    const placeProperties = await PlaceProperties.create({
      placeId: place.id,
      parking,
      ramp,
      elevator,
      toilet,
      floor,
    });
  
    res.status(201).json({ place, placeProperties });
  };

  module.exports = { getAll, addPlace }