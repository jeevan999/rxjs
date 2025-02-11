const { Server } = require("socket.io");

let io; // Declare io variable

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Change this for security
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initializeSocket, getIo };
