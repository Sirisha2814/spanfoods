const asyncHandler = require('express-async-handler');
const MealType=require('../models/mealModel')

// Create new mealtypes

const createMealTypes = asyncHandler(async (req, res) => {
  const { mealType} = req.body;
   const existingmealtype1=await MealType.findOne({mealType})
   if(existingmealtype1){
   throw new Error("Mealtype already exists")
   }
  try {
    const order = await MealType.create({mealType});

    res.status(201).json(order);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid data format');
  }
});



//get all mealtypes

const getMealTypes = asyncHandler(async (req, res) => {
  try {
    const orders = await MealType.find({}); // Use your desired query conditions if needed

    res.status(200).json(orders);
  } catch (error) {
    res.status(500);
    throw new Error('Error retrieving orders');
  }
});

//delete all orders

// const clearOrders = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(401);
//     throw new Error('User Not Found');
//   }

//   await Food.deleteMany({ user: req.user.id });

//   res.status(200).json({ message: 'All orders cleared successfully.' });
// });


module.exports = {
  createMealTypes,
  getMealTypes
};