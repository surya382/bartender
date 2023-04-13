
const mongoose=require("mongoose");


const cockSchema=mongoose.Schema({

    image:{type:String,required:true},
    name:{type:String,required:true},
    base:{type:String,required:true},
    ingredients:{type:String,required:true},
    glasswares:{type:String,required:true},
    recipe:{type:Array,required:true},
    recipeBy:{type:String,required:true},
    price:{type:Number,required:true}

})


const Drink=mongoose.model("cocktail",cockSchema);

module.exports={Drink};