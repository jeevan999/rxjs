const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { initializeSocket } = require('./socket'); // Import initializeSocket

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/table_booking").then(() => {
    console.log("Mongoose Connected!");
});

const getRoutes = require("./expressRoutes/getRouts");
const postRoutes = require("./expressRoutes/postRoutes");
const deleteRoutes = require("./expressRoutes/deleteRoutes");
const authRoutes = require("./expressRoutes/authRoutes");

app.use("/read-data", getRoutes);
app.use("/add-data", postRoutes);
app.use("/delete-data", deleteRoutes);
app.use("/auth", authRoutes)

// Initialize Socket.IO
initializeSocket(server);

server.listen(8000, () => {
    console.log("Listening on port 8000");
});












// command for starting mongodb
// sudo mongod --dbpath=/Users/nikhilkrishna/data/db


