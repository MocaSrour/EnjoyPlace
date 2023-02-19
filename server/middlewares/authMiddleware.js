const { verifyToken } = require("../controllers/authToken");

const auth = (req, res, next) => {
  const jwtCookie = req.headers.cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("jwt="));

  const jwt = jwtCookie ? jwtCookie.split("=")[1] : undefined;

  const data = verifyToken(jwt);

  if (data) {
    req.user = data;
    next();
  } else {
    res.status(401).send("Unverified");
  }
};

module.exports = { auth };
