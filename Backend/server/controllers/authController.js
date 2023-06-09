const User = require("../../models/User");
const { generateToken } = require("./authToken");

const maxAge = 3 * 24 * 60 * 60;

module.exports.signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.create({ userName, email, password, role: "User" });
    const token = generateToken(user);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * maxAge });
    delete user.dataValues.password;
    res.status(201).json(user);
  } catch (err) {
    err.code = 401;
    err.message = "Error creating the user";
    next(err);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const base64Credentials = req.headers.authorization.split(" ")[1];

    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );

    const [email, password] = credentials.split(":");

    const user = await User.login(email, password);

    const token = generateToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * maxAge,
      Path: "/",
    });
    user.dataValues && delete user.dataValues.password;

    res.status(200).json(user);
  } catch (error) {
    error.message = "Login failed";
    error.code = 401;
    next(error);
  }
};
module.exports.logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).send("Logged out successfully");
  } catch (error) {
    error.message = "Failed to log out";
    error.code = 401;
    next(error);
  }
};
