const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, pin } = req.body;

    let role;
    if (pin === "123") role = "korban";
    else if (pin === "456") role = "relawan";
    else return res.status(400).json({ error: "PIN tidak valid, harus 123 atau 456" });

    const hashedPin = await bcrypt.hash(pin, 10);
    const user = new User({ username, pin: hashedPin, role });
    await user.save();

    res.status(201).json({ message: "User registered", user: { username, role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, pin } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid username or PIN" });

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) return res.status(400).json({ error: "Invalid username or PIN" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
