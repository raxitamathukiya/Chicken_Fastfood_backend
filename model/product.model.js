const mongoose=require("mongoose")
const connection=require("../db")
const productSchema=mongoose.Schema({
    title:String,
    image:String,
    price:Number,
    category:String,
    discription:String,
})

const productModel=mongoose.model("product",productSchema)
module.exports={
    productModel
}