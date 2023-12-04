const asyncHandler = require('express-async-handler');
const Food = require('../models/foodModel');
const User = require('../models/userModel')

// Create new order

const createOrder = asyncHandler(async (req, res) => {
  const { date, location, mealType, food } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User Not Found');
  }
  // const existingOrder = await Food.findOne({ user: req.user.id, date });

  // if (existingOrder) {
  //   res.status(400);
  //   throw new Error('An order already exists for the selected date');
  // }

  try {
    
    const order = await Food.create({
      date,
      location,
      mealTypes: {
        Breakfast: mealType === 'Breakfast',
        morningsnacks: mealType === 'morningsnacks',
        Lunch: mealType === 'Lunch',
        eveningsnacks: mealType === 'eveningsnacks',
        Dinner: mealType === 'Dinner',
      },
      food,
      user: req.user.id,
    });
    // console.log(order);

    res.status(201).json(order);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid date format');
  }
});



//get all orders

const getOrders = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({});

    if (!user) {
      res.status(401);
      throw new Error('User Not Found');
    }

    const { date } = req.body;

    // Check if an order already exists for the selected date
    const existingOrder = await Food.find({ user: req.user.id,date,mealType,location });
    
    if (existingOrder.length > 0) {
      res.status(400);
      throw new Error('order with same date,location, and meal type is restricted is restricted');
    }

    // Retrieve all orders for the user
    const orders = await Food.find({ user: req.user.id });

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


//dlt order
const deleteOrder = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User Not Found');
  }

  const orderId = req.params.id; 

  const order = await Food.findOne({ _id: orderId, user: req.user.id });

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  await Food.deleteOne({ _id: orderId, user: req.user.id });

  res.status(200).json({ message: 'Order deleted successfully.' });
});



module.exports = {
  createOrder,
  getOrders,
  // clearOrders,
  deleteOrder
};