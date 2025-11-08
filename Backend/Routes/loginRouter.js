const express=require("express");
const loginRouter=express.Router();
const Model=require("../Models/signup");
const mongoose = require("mongoose");

 
loginRouter.post("/api/signup",async (req,res)=>{
    const {username, email, password}= req.body;
    const existingUser= await Model.findOne({username}); 
    const existingEmail= await Model.findOne({email});
    if (existingUser){
        return res.json({message:"Username Taken"});
    } 
    else if (existingEmail){
        return res.json({message:"Email Already Registered"});
    }
    else{
    const data=new Model({username, email, password});
    const user= await data.save()
    return res.json({message:"Registered Successfully"});
    }
})

loginRouter.post("/api/login",async(req,res)=>{
    const {username,password} = req.body;
    const user= await Model.findOne({username,password});
    if(user){
        return res.json({message:"Present"});
    }
})

module.exports=loginRouter;