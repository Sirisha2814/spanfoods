const mongoose=require('mongoose')
const MealtypeSchema=new mongoose.Schema({
  mealType: {
        type: String,
      },
    })
    const MealType = mongoose.model('Mealtype',MealtypeSchema );

module.exports = MealType;