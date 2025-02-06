const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*", // Allow requests from any origin (change for security)
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());

const getRoutes = require("./expressRoutes/getRouts");
const postRoutes = require("./expressRoutes/postRoutes");
const deleteRoutes = require("./expressRoutes/deleteRoutes");

mongoose.connect("mongodb://localhost:27017/table_booking").then(() => {
    console.log('mongoose Connected!');
})

app.use('/read-data', getRoutes)
app.use('/add-data', postRoutes)
app.use('/delete-data', deleteRoutes)


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

module.exports = { io };

server.listen(8000, () => {
    console.log('listening to port 8000')
})