const { Router } = require("express");
const rateController = require("../controllers/rateController");

const router = Router();

router.post("/add-rate", rateController.addRate);
router.get("/getRatesByPlace/:placeId", rateController.getbyPlace);
router.put('/edit-rate', rateController.editRate )

module.exports = router;