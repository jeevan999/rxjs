const express = require('express');
const mongoose = require('mongoose')
const routes = express.Router();

const FoodItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
});

const FoodItem = mongoose.model('FoodItemm', FoodItemSchema, 'foodItems');


routes.delete('/food-items', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Food item name is required" });
        }

        const deletedItem = await FoodItem.findOneAndDelete({ name });

        if (!deletedItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        res.status(200).json({ message: "Food item deleted successfully", deletedItem });

    } catch (error) {
        console.error("Error deleting food item:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


routes.delete('/servers', (req, res) => {
})

routes.delete('/chairs', (req, res) => {
})

module.exports = routes