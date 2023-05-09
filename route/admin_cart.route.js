const express=require("express")
const admincartRoute=express.Router()
const {cartModel}=require("../model/cart.model")
const {connection}=require("../db")

admincartRoute.post("/addcart",async(req,res)=>{
    try {
        let postdata=req.body
        let data=new cartModel(postdata)
        await data.save()
        res.status(200).send({message:"This product added in to the cart"})
    } catch (error) {
        console.log(error)
    }
})

admincartRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params 
    let data=await cartModel.findByIdAndDelete({_id:id})
    res.status(200).send({message:'order deleted'})
    } catch (error) {
        console.log(error)
    }
})
admincartRoute.get("/get",async(req,res)=>{
    try {
        let data=await cartModel.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        
    }
})

module.exports={
    admincartRoute
}