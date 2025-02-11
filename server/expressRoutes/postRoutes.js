const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const { getIo } = require('../socket'); // Import getIo from socket.js

const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});


const FoodIngredients = new mongoose.Schema({
    name: { type: String, required: true },
    name2: { type: Number, required: true },
    name3: { type: Array, required: true },
    name4: { type: Boolean, required: true },
    name5: { type: Date, required: true },
    name6: { type: Map, required: true}
})

const FoodItem = mongoose.model('FoodItem', FoodItemSchema, 'foodItems');

routes.post('/food-items', async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newFoodItem = new FoodItem({ name, price });
        await newFoodItem.save();

        const io = getIo(); // Get initialized io instance
        io.emit("foodItemAdded", newFoodItem); // Emit event

        res.status(201).json({ message: "Food item added successfully", data: newFoodItem });
    } catch (error) {
        console.error("Error adding food item:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = routes;
