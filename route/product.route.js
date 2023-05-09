const express=require("express")
const productRoute=express.Router()
const {productModel}=require("../model/product.model")
const {connection}=require("../db")

productRoute.post("/add",async(req,res)=>{
    try {
        const data=req.body
        const add=new productModel(data)
        await add.save()
        res.status(200).send({message:"new product added"})
    } catch (error) {
        console.log(error)
    }
})

productRoute.get("/get",async(req,res)=>{
    try {
        let data=await productModel.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})

productRoute.get("/category",async(req,res)=>{
    try {
        let query=req.query
        let data=await productModel.find(query)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})
productRoute.get("/:id",async(req,res)=>{
    try {
        const {id}=req.params
        let data=await productModel.find({_id:id})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})

productRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params 
        let data=await productModel.findByIdAndDelete({_id:id})
        res.status(200).send({message:'Product deleted'})
    } catch (error) {
        console.log(error)
    }
})
productRoute.put("/update/:id",async(req,res)=>{
    try {
        const {id}=req.params 
        const updata=req.body
        let data=await productModel.findByIdAndUpdate({_id:id},updata)
        res.status(200).send({message:'Product Update'})
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    productRoute
}

