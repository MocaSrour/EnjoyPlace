const { Router } = require("express");
const rateController = require("../controllers/rateController");
const { auth } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/add-rate", auth, rateController.addRate);
router.get("/getRatesByPlace/:placeId", auth, rateController.getbyPlace);
router.put("/edit-rate", auth, rateController.editRate);

module.exports = router;
