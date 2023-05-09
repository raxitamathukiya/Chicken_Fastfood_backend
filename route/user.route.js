const express=require("express")
const userRoute=express.Router()
const {userModel}=require("../model/user.model")
const {connection}=require("../db")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

// /**
//  * @swagger
//  * tags:
//  *  name: Users
//  *  description: All the API routes realeted the Users
//  */

// /**
//  * @swagger
//  * /users/register:
//  *  post:
//  *      summary: This will add new user in the DataBase
//  *      tags: [Users]
//  *      responses:
//  *          200:
//  *              description: registration is successfully done!! 
//  *          400:
//  *              description: Inccorect Request!!!!
//  */

// /**
//  * @swagger
//  * /users/login:
//  *  post:
//  *      summary: This will check user exits or not
//  *      tags: [Users]
//  *      responses:
//  *          200:
//  *              description: login successfully!! 
//  *          400:
//  *              description: Inccorect Request!!!!
//  */

userRoute.get("/get/:id",async(req,res)=>{
    try {
        const {id}=req.params
        let data=await userModel.findById({_id:id})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})
userRoute.post("/register",async(req,res)=>{
    const {name,age,email,password,city}=req.body
   
    try {
        let data=await userModel.find({email})
        if(data.length!=0){
            console.log(data)
            res.status(200).send({meassage:"user already exists!!"})
        }
       else{
        bcrypt.hash(password, 5, async(err, hash)=> {
            const adddata=new userModel({name,age,email,password:hash,city})
            await adddata.save()
            res.status(200).send({msg:`Hello ${req.body.name} registration is successfully done!!`})
        }); 
       }
    } catch (error) {
        console.log("error")
    }

})

userRoute.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body
        let data=await userModel.findOne({email})
        if(data){
            bcrypt.compare(req.body.password,data.password,(err,result)=>{
                if(result){
                    let token = jwt.sign({ user:data.name,userID:data._id}, 'raxita');
                    res.status(200).send({message:`Hello ${data.name} login successfully`,"token":token,"name":data.name})
                }else{
                    res.status(200).send({message:`Invalid Credintails!!!!!!!`})
                }
            })
        }
        else{
            res.status(200).send({message:`Invalid Credintails!!!!!!!`})
        }
    } catch (error) {
        console.log(error)
    }

})

userRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params 
    let data=await userModel.findByIdAndDelete({_id:id})
    res.status(200).send({message:'User deleted'})
    } catch (error) {
        console.log(error)
    }
})

userRoute.get("/get",async(req,res)=>{
    try {
        
    let data=await userModel.find()
    res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    userRoute
}