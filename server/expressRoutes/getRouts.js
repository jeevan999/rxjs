const express = require('express');
const mongoose = require('mongoose');
const routes = express.Router();

const FoodItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

const FoodItems = mongoose.model('FoodItems', FoodItemSchema, 'foodItems');


routes.get('/food-items', async (req, res) => {
  try {
    const foodItems = await FoodItems.find(); // Fetch all food items
    res.json(foodItems); // Send response as JSON
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

routes.get('/servers', (req, res) => {
})

routes.get('/chairs', (req, res) => {
})

module.exports = routes