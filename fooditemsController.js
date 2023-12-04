const asyncHandler = require('express-async-handler');
const foodItems = require('../models/fooditemsModel');

// Create new food item
const createFoodItem = asyncHandler(async (req, res) => {
    const {location,mealType,food } = req.body;
    const existingFoodItem=await foodItems.findOne({location,mealType,food})
    if(existingFoodItem){
      throw new Error('food already exists')
    }
    try {
      const foodItem = await foodItems.create({
        location,
        mealType,
        food
      });
  
      res.status(201).json(foodItem);
      
    } catch (error) {
      res.status(400);
      throw new Error('Invalid data format');
    }
  });

// Get all food items

const getFoodItems = asyncHandler(async (req, res) => {
  try {
    const foodItemsList = await foodItems.find({}); // Use your desired query conditions if needed
    res.status(200).json(foodItemsList);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid data format');;
  }
});

module.exports = {
  createFoodItem,
  getFoodItems
};