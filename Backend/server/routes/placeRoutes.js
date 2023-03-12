const { Router } = require("express");
const placeController = require("../controllers/placeController");
const mod = require("../../models/index");
const { checkAddPlace } = require("../middlewares/checkAddPlace");
const { auth } = require("../middlewares/authMiddleware");
const { authAdmin } = require("../middlewares/authAdmin");

const router = Router();

router.get("/places", auth, placeController.getAll);
router.post(
  "/add-place",
  auth,
  authAdmin,
  checkAddPlace(),
  placeController.addPlace
);
router.get("/get-place/:placeId", auth, mod.Place.getPlaceById);
router.delete(
  "/delete-place/:placeId",
  auth,
  authAdmin,
  placeController.deletePlace
);

module.exports = router;
