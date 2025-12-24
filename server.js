require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const onlyKorban = require("./middleware/onlyKorban");
const onlyRelawan = require("./middleware/onlyRelawan");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);

app.get("/api/dasboard", auth, (req, res) => {
  res.json(req.user);
});

app.post("/api/emergency", auth, onlyKorban, (req, res) => {
  res.json({ message: "Laporan korban masuk" });
});

app.post("/api/calling", auth, onlyRelawan, (req, res) => {
  res.json({ message: "Verifikasi relawan sukses" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
