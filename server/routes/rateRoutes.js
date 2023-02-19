const { Router } = require("express");
const rateController = require("../controllers/rateController");

const router = Router();

router.post("/add-rate", rateController.addRate);
router.get("/getRatesByPlace/:placeId", rateController.getbyPlace);

module.exports = router;