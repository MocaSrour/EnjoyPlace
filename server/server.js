const express = require("express");
const authRoutes = require("../server/routes/authRoutes");
const placeRoutes = require("../server/routes/placeRoutes");
const rateRoutes = require("../server/routes/rateRoutes");
const errorHandler = require("./middlewares/errorHandler");

const startServer = () => {
  const app = express();

  app.use(express.json());

  app.listen(3000);

  app.use(authRoutes);
  app.use(placeRoutes);
  app.use(rateRoutes);

  app.use(errorHandler);
};

module.exports = startServer;
