require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const corsOptions = {
  origin: "https://tniamerika.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));
const server = http.createServer(app);
const { initSocket } = require("./utils/socket");
initSocket(server);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/emergency", require("./routes/emergency"));
app.use("/api/calling", require("./routes/calling"));
app.use("/api/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);





