const mongoose = require('mongoose');

const foodSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: Date,
    //   required: [true, 'Please add a date'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
      // enum: ['Chennai', 'Coimbatore', 'Erode'],
    },
    mealTypes: {
      Breakfast: {
        type: Boolean,
        default: false,
      },
      Morningsnacks:{
        type:Boolean,
        default:false,
      },
      Lunch: {
        type: Boolean,
        default: false,
      },
      Eveningsnacks:{
        type:Boolean,
        default:false,
      },
      Dinner: {
        type: Boolean,
        default: false,
      },
    },
    food: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Food', foodSchema);