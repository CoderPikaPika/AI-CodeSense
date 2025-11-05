const express=require("express");
const Router=express.Router();
const dotenv=require("dotenv");
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

Router.post("/api/gemini",async (req,res)=>{
    const {prompt} =req.body;
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return res.json({response:text});
})

module.exports=Router;