const Rate = require('../../models/Rate');

// GEt rates by placeID
const getbyPlace = async (req, res) => {
    const rates = await Rate.findAll({ where: { placeId: req.body.placeId } });
    return res.json({ rates});
  }
  
  // Add A NEW Rate
const addRate = async (req, res) => {
    const { userId, placeId, rate, comment } = req.body;
    const newRate = await Rate.create({ userId, placeId, rate, comment });
    calculateRate(placeId);
    res.status(201).json({ newRate });
  };

  const findAllRates = async (id) => await Rate.findAll({ where: { placeId: id } });
module.exports = { getbyPlace, addRate, findAllRates }