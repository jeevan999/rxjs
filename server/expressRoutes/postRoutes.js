const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const FoodItem = mongoose.model('foodItems', FoodItemSchema);



routes.post('/food-items',async (req, res) => {
    try {
        const { name, price } = req.body; // Get data from request

        if (!name || !price) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newFoodItem = new FoodItem({ name, price }); // Create a new instance
        await newFoodItem.save(); // Save to MongoDB

        console.log("Food item added:", newFoodItem);
        res.status(201).json({ message: "Food item added successfully", data: newFoodItem });
    } catch (error) {
        console.error("Error adding food item:", error);
        res.status(500).json({ message: "Server error" });
    }
});

routes.post('/servers', (req, res) => {
    res.send("Server added successfully");
});

routes.post('/chairs', (req, res) => {
    res.send("Chair added successfully");
});

module.exports = routes;