const mongoose=require('mongoose')
const MealSchema=new mongoose.Schema({
     location: {
        type: String,
      },
      mealType:{
        type:String,
      }
    })
    const MealType = mongoose.model('Meal',MealSchema );

module.exports = MealType;