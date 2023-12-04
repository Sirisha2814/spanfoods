const mongoose = require('mongoose');

const foodItemsSchema=new mongoose.Schema({
    location:{
        type:String,
    },
    mealType:{
        type:String,
    },
    food:{
        type:String,
    }

})
const foodItems = mongoose.model('foodItems',foodItemsSchema);

module.exports =foodItems;