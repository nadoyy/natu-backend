require("dotenv").config();
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const auth = require("./middleware/auth");

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const { initSocket } = require("./utils/socket");
initSocket(server);

app.get("/api/dashboard", auth, (req, res) => {
  res.json(req.user);
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/emergency", require("./routes/emergency"));
app.use("/api/calling", require("./routes/calling"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

