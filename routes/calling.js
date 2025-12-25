const router = require("express").Router();
const auth = require("../middleware/auth");
const onlyRelawan = require("../middleware/onlyRelawan");
const callingController = require("../controllers/callingController");

router.post("/calling", auth, onlyRelawan, callingController.verifyRelawan);
router.post("/accept", auth, onlyRelawan, callingController.acceptEmergency);

module.exports = router;
