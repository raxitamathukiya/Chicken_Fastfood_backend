const express=require("express")
const cartRoute=express.Router()
const {cartModel}=require("../model/cart.model")
const {connection}=require("../db")
require ('dotenv').config()

cartRoute.post("/addcart",async(req,res)=>{
    try {
        let postdata=req.body
        let data=new cartModel(postdata)
        await data.save()
        res.status(200).send({message:"This product added in to the cart"})
    } catch (error) {
        console.log(error)
    }
})

cartRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params 
    let data=await cartModel.findByIdAndDelete({_id:id})
    res.status(200).send({message:'product deleted'})
    } catch (error) {
        console.log(error)
    }
})
cartRoute.get("/get",async(req,res)=>{
    try {
        let data=await cartModel.find({userID:req.body.userID})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        
    }
})


module.exports={
    cartRoute
}