const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { initializeSocket } = require('./socket'); // Import initializeSocket
const dotenv=require('dotenv')
dotenv.config()
const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Mongoose Connected!");
});

const getRoutes = require("./expressRoutes/getRouts");
const postRoutes = require("./expressRoutes/postRoutes");
const deleteRoutes = require("./expressRoutes/deleteRoutes");
const authRoutes = require("./expressRoutes/authRoutes");
const projectRoutes=require("./expressRoutes/projectRoutes")

app.use("/read-data", getRoutes);
app.use("/add-data", postRoutes);
app.use("/delete-data", deleteRoutes);
app.use("/auth", authRoutes);
app.use("/projects",projectRoutes)

// Initialize Socket.IO
initializeSocket(server);

server.listen(8000, () => {
    console.log("Listening on port 8000");
    console.log(process.env.MONGODB_URL)
    console.log(process.env.SERVER_PORT);
    console.log(process.env.SECRET_KEY)
});












// command for starting mongodb
// sudo mongod --dbpath=/Users/nikhilkrishna/data/db


