const router = require("express").Router();
const auth = require("../middleware/auth");
const onlyKorban = require("../middleware/onlyKorban");
const emergencyController = require("../controllers/emergencyController");

router.post("/", auth, onlyKorban, emergencyController.createEmergency);

module.exports = router;
