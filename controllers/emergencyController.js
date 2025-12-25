const Emergency = require("../models/Emergency");
const { io, clients } = require("../utils/socket");

exports.createEmergency = async (req, res) => {
    try {
        const { name, lat, lng, additionalInfo } = req.body;
        if (!lat || !lng || !name) return res.status(400).json({ message: "Data tidak lengkap" });

        const emergency = new Emergency({
            userId: req.user.id,
            name,
            lat,
            lng,
            statusEvakuasi: "diminta",
            additionalInfo
        });

        await emergency.save();

        // Kirim ke semua relawan via socket
        for (const uid in clients) {
            if (clients[uid].role === "relawan") {
                clients[uid].socket.emit("newEmergency", emergency);
            }
        }

        res.json({ message: "Laporan korban masuk", caseId: emergency._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
