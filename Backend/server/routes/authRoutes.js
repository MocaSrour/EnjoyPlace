const { Router } = require("express");
const authController = require("../controllers/authController");
const { checkEmailnPass } = require("../middlewares/checkEmailnPass");

const router = Router();

router.post("/signup", checkEmailnPass(), authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
