const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
    userId: String,
    name: String,
    lat: Number,
    lng: Number,
    timestamp: { type: Date, default: Date.now },
    statusEvakuasi: { type: String, default: "diminta" },
    assignedRelawanId: { type: String, default: null },
    additionalInfo: String
});

module.exports = mongoose.model("Emergency", emergencySchema);
