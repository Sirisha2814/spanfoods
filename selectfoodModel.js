const mongoose=require('mongoose')
const selectFoodSchema=new mongoose.Schema({
      mealType:{
        type:String,
      },
      food:{
        type:String,
      },
    })
    const selectfood = mongoose.model('selectfood',selectFoodSchema );

module.exports = selectfood;