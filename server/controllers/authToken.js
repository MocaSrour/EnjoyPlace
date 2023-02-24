const jwt = require("jsonwebtoken");
require("dotenv").config();

//          days * hours * min * sec
const maxAge = 3 * 24 * 60 * 60;

function generateToken(user) {
  const payload = {
    id: user.id,
    userName: user.userName,
    role: user.role,
  };
  const options = {
    expiresIn: maxAge,
  };

  return jwt.sign(payload, process.env.MY_SECRET, options);
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.MY_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
