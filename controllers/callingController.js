const Emergency = require("../models/Emergency");
const { clients } = require("../utils/socket");

exports.verifyRelawan = (req, res) => {
    res.json({ message: "Verifikasi relawan sukses" });
};

exports.acceptEmergency = async (req, res) => {
    try {
        const { caseId } = req.body;
        const emergency = await Emergency.findById(caseId);
        if (!emergency) return res.status(404).json({ message: "Emergency not found" });
        if (emergency.assignedRelawanId) return res.status(400).json({ message: "Sudah diterima relawan lain" });

        emergency.assignedRelawanId = req.user.id;
        emergency.statusEvakuasi = "diterima";
        await emergency.save();

        // Kirim ke korban
        const korbanSocket = clients[emergency.userId]?.socket;
        if (korbanSocket) {
            korbanSocket.emit("relawanAssigned", {
                caseId,
                relawanId: req.user.id,
                name: req.user.name,
                lat: req.user.lat,
                lng: req.user.lng,
                timestamp: Date.now(),
                statusEvakuasi: "diterima"
            });
        }

        res.json({ message: "Emergency diterima", caseId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
