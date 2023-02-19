const { Router } = require("express");
const placeController = require("../controllers/placeController");
const mod = require("../../models/index");
const { checkAddPlace } = require("../middlewares/checkAddPlace");
const { auth } = require("../middlewares/authMiddleware");

const router = Router();

router.get("/places", auth, placeController.getAll);
router.post("/add-place", checkAddPlace(), placeController.addPlace);
router.get("/get-place/:placeId", mod.Place.getPlaceById);
router.delete("/delete-place/:placeId", placeController.deletePlace);

module.exports = router;