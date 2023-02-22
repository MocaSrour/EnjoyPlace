const { verifyToken } = require("../controllers/authToken");

const auth = (req, res, next) => {
  try {
    const jwtCookie = req.headers.cookie
      ?.split(";")
      .find((c) => c.trim().startsWith("jwt="));
  
    const jwt = jwtCookie ? jwtCookie.split("=")[1] : undefined;
  
    const data = verifyToken(jwt);
  
    if (data) {
      req.user = data;
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error(error);
    res.status(401).send("Error handling authorizations");
  }
};

module.exports = { auth };
