const { Router } = require("express");
const { getLocation, addLocation } = require("../controllers/locationController");

const router = Router();

router.get("/location/:placeId", getLocation);
router.post("/add-location/", addLocation);


module.exports = router;