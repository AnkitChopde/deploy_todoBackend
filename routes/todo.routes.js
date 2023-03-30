const express = require("express");
const authenticate = require("../middlewares/auth.middleware");
const TodoModel = require("../models/todo.model");
const todoRouter = express.Router();
const jwt = require("jsonwebtoken");

todoRouter.post("/create",authenticate,async(req,res)=>{
    const payload = req.body;
    try{
        const todos = TodoModel(payload);
        await todos.save();
        res.status(200).send({
            "msg":"Todo Details added successfully"
        });

    }
    catch(err){
        res.status(400).send({
            "msg":err.message
        })
    }
});

todoRouter.get("/",authenticate,async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"ankesh")
    console.log(decoded)
    try{
        if(decoded){
            const todos =await TodoModel.find({userID:decoded.userID});
            res.status(200).json(todos)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
    try{
      
    }
    catch(err){
        res.status(400).send({
            "msg":"error"
        })
    }
})

todoRouter.patch("/update/:todoId",authenticate,async(req,res)=>{
    const payload = req.body;
    const id = req.params.todoId
    try{
        await TodoModel.findByIdAndUpdate({_id:id},payload);
        res.status(200).send({
            "msg":"Todo details updated successfully"
        })
    }
    catch(err){
        res.status(400).send({
            "msg":"error"
        })
    }
})

todoRouter.delete("/delete/:todoId",authenticate,async(req,res)=>{
   
    const id = req.params.todoId
    try{
        await TodoModel.findByIdAndDelete({_id:id});
        res.status(200).send({
            "msg":"Todo details deleted successfully"
        })
    }
    catch(err){
        res.status(400).send({
            "msg":err.message
        })
    }
})

module.exports=todoRouter
