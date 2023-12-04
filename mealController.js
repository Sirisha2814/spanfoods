const asyncHandler = require('express-async-handler');
const Meal=require('../models/selectmealModel')

// Create new meal

const createMeal = asyncHandler(async (req, res) => {
  const { mealType,location } = req.body;
   const existingmealtype1=await Meal.findOne({location,mealType})
   if(existingmealtype1){
   throw new Error("selected location already has that mealtype")
   }
  try {
    const order = await Meal.create({location,mealType });

    res.status(201).json(order);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid data format');
  }
});


//get all meals

const getMeal = asyncHandler(async (req, res) => {
  try {
    const orders = await Meal.find({}); // Use your desired query conditions if needed

    res.status(200).json(orders);
  } catch (error) {
    res.status(500);
    throw new Error('Error retrieving orders');
  }
});


module.exports = {
    createMeal,
    getMeal
  };