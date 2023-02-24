const { body, validationResult } = require("express-validator");
const { floor } = require("lodash");
const PlaceController = require("../controllers/placeController");

const checkAddPlace = () => {
  return [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .custom((value) => {
        return PlaceController.getPlaceByTitle(value.toLowerCase()).then(
          (place) => {
            if (place) {
              return Promise.reject("This place already added");
            }
          }
        );
      }),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter a valid Email"),
    body("phone")
      .not()
      .isEmpty()
      .withMessage("Phone is required")
      .isInt()
      .withMessage('Phone should be numbers only')
      .isLength({ min: 7, max: 18 })
      .withMessage("Phone should be at least 7 Numbers & maximum 18"),
    body("parking").isBoolean().withMessage("Parking should be a boolean"),
    body("ramp").isBoolean().withMessage("ramp should be a boolean"),
    body("elevator").isBoolean().withMessage("Elevator should be a boolean"),
    body("toilet").isBoolean().withMessage("Toilet should be a boolean"),
    body("floor").isInt().withMessage("Floor should be a number"),
    (req, res, next) => {
      const errors = validationResult(req); // { errors: [ { }]}
      if (!errors.isEmpty()) {
        const inputErrors = {};
        const reversedErrors = errors.errors.reverse();
        reversedErrors.forEach((err) => {
          inputErrors[err.param] = err.msg;
        });
        return res.status(400).send({ errors: inputErrors });
      }
      next();
    },
  ];
};

module.exports = { checkAddPlace };
