const { body, validationResult, header } = require("express-validator");
const User = require("../../models/User");

//  type = "registration"
const checkEmailnPass = () => {
  return [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter a valid Email")
      .custom((value) => {
        return User.getUserById(value).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      }),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters"),
    (req, res, next) => {
      const errors = validationResult(req); // { errors: [ { }]}
      if (!errors.isEmpty()) {
        const inputErrors = {};
        const reversedErrors = errors.errors.reverse();
        reversedErrors.forEach((err) => {
          inputErrors[err.param] = err.msg;
        });
        return res.status(401).send({ errors: inputErrors });
      }
      next();
    }
  ]
};

module.exports = { checkEmailnPass };


// //// 
// const logineEmailValidator = [
//   header(["authorization", "name"])
//     .not()
//     .isEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Enter a valid Email"),
//   header("authorization.pass")
//     .not()
//     .isEmpty()
//     .withMessage("Password is required")
//     .isLength({ min: 6 })
//     .withMessage("Password should be at least 6 characters"),
// ];

// const registrationEmailValidator = [
//   body("email")
//     .not()
//     .isEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Enter a valid Email")
//     .custom((value) => {
//       return User.getUserById(value).then((user) => {
//         if (user) {
//           return Promise.reject("E-mail already in use");
//         }
//       });
//     }),
//   body("password")
//     .not()
//     .isEmpty()
//     .withMessage("Password is required")
//     .isLength({ min: 6 })
//     .withMessage("Password should be at least 6 characters"),
// ];

// return [
//   type === "registration" ? registrationEmailValidator[0] : logineEmailValidator[0],
//   type === "registration" ? registrationEmailValidator[1] : logineEmailValidator[1],
//   (req, res, next) => {
//     const errors = validationResult(req); // { errors: [ { }]}
//     if (!errors.isEmpty()) {
//       const inputErrors = {};
//       const reversedErrors = errors.errors.reverse();
//       reversedErrors.forEach((err) => {
//         inputErrors[err.param] = err.msg;
//       });
//       return res.status(401).send({ errors: inputErrors });
//     }
//     next();
//   },
// ];
