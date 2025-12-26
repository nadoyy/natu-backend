const router = require("express").Router();
const auth = require("../middleware/auth");

// Route GET dashboard
router.get("/", auth, (req, res) => {
    res.json(req.user);
});

module.exports = router;
