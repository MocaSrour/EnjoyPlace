const authAdmin = (req, res, next) => {
  try {
    console.log(req.user.role);
    if (req.user.role === "Admin") {
      next();
    } else {
      res.status(403).send("User is not an admin");
    }
  } catch (error) {
    console.error(error);
    res.status(403).send("Error handling authorizations");
  }
};

module.exports = { authAdmin };
