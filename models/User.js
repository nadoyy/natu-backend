const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  role: { type: String, enum: ["relawan", "korban"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
