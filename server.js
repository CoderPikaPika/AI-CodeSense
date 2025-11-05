const express=require("express");
const PORT=3000;
const app=express();
const geminiRouter=require("./Backend/Routes/geminiRouter")


app.use(express.static('Frontend'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile('index.html',{ root : "./Frontend"});
})

app.use(geminiRouter);


app.listen(PORT,()=>{
    console.log("Server Started");
})