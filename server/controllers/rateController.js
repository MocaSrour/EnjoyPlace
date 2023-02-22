const Rate = require("../../models/Rate");
const { updateRate } = require("./placeController");
const { RateError } = require("../../Errors");
const User = require("../../models/User");

// GEt rates by placeID
const getbyPlace = async (req, res) => {
  const rates = await Rate.findAll({ include: {
    model: User,
    attributes: ['userName']
  },
  where: { placeId: req.params.placeId } });
  return res.json({ rates });
};

const calculateRate = async (placeId) => {
  try {
    const { count, rows } = await Rate.findAndCountAll({
      where: { placeId: placeId },
    });

    const rateSum = rows.reduce((acc, curr) => acc + curr.rate, 0);
    const average = rateSum / count;
    await updateRate(placeId, average);
  } catch (error) {
    if (error instanceof RateError) {
      throw error;
    }
    throw new RateError("Error while calculating rate", 402);
  }
};

// Add A NEW Rate
const addRate = async (req, res, next) => {
  try {
    try {
      const { userId, placeId, rate, comment } = req.body;
      const newRate = await Rate.create({ userId, placeId, rate, comment });
      await calculateRate(placeId);
      res.status(201).json({ newRate });
    } catch (errorForAdd) {
      if (errorForAdd instanceof RateError) {
        throw errorForAdd;
      }
      throw new RateError("Error while adding rate", 400);
    }
  } catch (error) {
    next(error);
  }
};

const findAllRates = async (id) => {
  try {
    return await Rate.findAll({ where: { placeId: id } });
  } catch (error) {
    throw new RateError("Error while getting rates of place", 404);
  }
};

const editRate = async (req, res, next) => {
  try {
    try {
      const { userId, placeId, rate, comment } = req.body;

      const newRate = await Rate.update({ rate, comment }, { where: {
        userId: userId, placeId: placeId
      }});
      await calculateRate(placeId);
      res.status(201).json({ newRate });
    } catch (errorForAdd) {
      if (errorForAdd instanceof RateError) {
        throw errorForAdd;
      }
      throw new RateError("Error while editing rate", 400);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getbyPlace, addRate, findAllRates, editRate };
