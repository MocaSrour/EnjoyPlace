const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const auth = require("basic-auth");

//          days * hours * min * sec
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res, next) => {
 
try{
  const { userName, email, password } = req.body;
  const user = await User.create({ userName, email, password });
  const token = createToken(user.id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * maxAge });
  res.status(201).json({ user: user.id });
}
catch(err) {
  err.code = 401;
  err.message = 'Error creating the user';
  next(err);
}
};
module.exports.login = async (req, res, next) => {
  try {
    const email = auth.parse(req.headers.authorization).name;
    const password = auth.parse(req.headers.authorization).pass;
  
    console.log({ email, password });
  
    const user = await User.login(email, password);
    const token = createToken(user.id);
    // console.log({token});
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * maxAge });
    res.status(200).json(user);
  } catch (error) {
    error.message = "Login failed"
    error.code = 401
    next(error)
  }
};
module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
