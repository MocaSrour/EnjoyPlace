const jwt = require('jsonwebtoken');

const secret = 'secret';
//          days * hours * min * sec
const maxAge = 3 * 24 * 60 * 60;

function generateToken(user) {
  const payload = {
    id: user.id,
    userName: user.userName
  };
  const options = {
    expiresIn: maxAge
  };
 
  return jwt.sign(payload, secret, options);
}

function verifyToken(token) {
  try {
    
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
