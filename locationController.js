const asyncHandler = require('express-async-handler');
const Food = require('../models/foodModel');
const Location=require('../models/LocationModel')

// Create new location

const createLocations = asyncHandler(async (req, res) => {
  const { location } = req.body;
  const existinglocation=await Location.findOne({location})
  if(existinglocation){
    throw new Error("location already exists")
  }
  try {
    // Use new Date to cast the date string to a date object
    const order = await Location.create({location });

    res.status(201).json(order);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid data format');
  }
});

//get all locations

const getLocations = asyncHandler(async (req, res) => {
  try {
    const orders = await Location.find({}); // Use your desired query conditions if needed
    // console.log("orders", orders)
    res.status(200).json(orders);
  } catch (error) {
    res.status(500);
    throw new Error('Error retrieving orders');
  }
});

module.exports = {
  createLocations,
  getLocations
};