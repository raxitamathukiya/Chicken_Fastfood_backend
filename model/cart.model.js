const mongoose=require("mongoose")
const connection=require("../db")
const cartSchema=mongoose.Schema({
    title:String,
    image:String,
    price:Number,
    category:String,
    discription:String,
    user:String,
    userID:String
})

const cartModel=mongoose.model("cart",cartSchema)
module.exports={
    cartModel
}