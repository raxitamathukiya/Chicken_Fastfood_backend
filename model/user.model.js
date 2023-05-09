const mongoose=require("mongoose")
const connection=require("../db")
const userSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    age: Number
})


const userModel=mongoose.model("Users",userSchema)

module.exports={
    userModel
}