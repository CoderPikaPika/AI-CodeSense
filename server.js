const express=require("express");
const PORT=3000;
const app=express();
const mongoose=require("mongoose");
const URL="mongodb+srv://db1:FirstDatabase@cluster0.ebuknnv.mongodb.net/?appName=Cluster0";
const geminiRouter=require("./Backend/Routes/geminiRouter");
const auth=require("./Backend/Routes/loginRouter");
const chat=require("./Backend/Routes/chatRouter");
const http=require("http");
const {Server}=require('socket.io');
const server=http.createServer(app);
const io= new Server(server);

app.use(express.static('Frontend'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile('index.html',{ root : "./Frontend"});
})

app.use(auth);
app.use(geminiRouter);

chat(io);


mongoose.connect(URL).then(() => {
  console.log("Connected to Mongo");
  server.listen(PORT,() => {
    console.log("Server Created.");
  });
});
