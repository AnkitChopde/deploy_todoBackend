const express = require("express");
const userRouter = express.Router();
const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

userRouter.post("/register",async(req,res)=>{
    const {email,pass,first_name,last_name} = req.body;
    const userAlready =await UserModel.findOne({email})
   
    try{
        if(userAlready){
            res.status(200).send({"msg":"User already exist, please login"})
        }else{
            bcrypt.hash(pass, 5,async(err, hash)=> {
                const user= UserModel({email,pass:hash,first_name,last_name});
                await user.save();
                 res.status(200).send({"msg":"Registration Successfully"})
             });
        }
        
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass,(err, result)=> {
               if(result){
                res.status(200).send({"msg":"Login Successfull","token": jwt.sign({ "userID":user._id }, 'ankesh',{ expiresIn: '7d' })})
               }else{
                res.status(400).send({"msg":"Wrong Credentials"})
               }
            });
        }else{
            res.status(400).send({"msg":"Wrong Credentials"}) 
        }
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
});

module.exports=userRouter;