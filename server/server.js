const express = require("express");
const authRoutes = require("../server/routes/authRoutes");
const placeRoutes = require("../server/routes/placeRoutes");
const rateRoutes = require("../server/routes/rateRoutes");
const locationRoutes = require("../server/routes/locationRoutes");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const startServer = () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());

  app.listen(3117);

  app.use(authRoutes);
  app.use(placeRoutes);
  app.use(rateRoutes);
  app.use(locationRoutes);

  app.use(errorHandler);
};

module.exports = startServer;
