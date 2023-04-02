const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://rahul:rahul@cluster0.iesgmef.mongodb.net/bartender?retryWrites=true&w=majority")

module.exports={connection};