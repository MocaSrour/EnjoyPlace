const { Router } = require("express");
const {
  getLocation,
  addLocation,
} = require("../controllers/locationController");
const { auth } = require("../middlewares/authMiddleware");

const router = Router();

router.get("/location/:placeId", auth, getLocation);
router.post("/add-location/", auth, addLocation);

module.exports = router;
