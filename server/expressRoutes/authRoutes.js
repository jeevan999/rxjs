const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { verifyToken } = require('../utils/tokenVierifier')

dotenv.config();
const routes = express.Router();

const User = mongoose.model('user', new mongoose.Schema({
    email: String,
    password: String
}))

const JWT_SECRET = process.env.JWT_SECRET


routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

routes.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword });
        user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

routes.get('/profile', verifyToken, async (req, res) => {
    res.json({ message: "Protected profile data", user: req.user });
});



module.exports = routes;