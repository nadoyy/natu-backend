let io = null;
let clients = {}; 

function initSocket(server) {
    const { Server } = require("socket.io");
    io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

    io.on("connection", socket => {
        console.log("New client:", socket.id);

        socket.on("register", ({ userId, role }) => {
            clients[userId] = { socket, role };
            console.log(`${role} registered: ${userId}`);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
            for (const uid in clients) {
                if (clients[uid].socket === socket) delete clients[uid];
            }
        });
    });
}

module.exports = { initSocket, io, clients };
