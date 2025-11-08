const mongoose= require("mongoose");
const schema= new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type: String 
    },
    password:{
        type: String
    }
});

const Profile=mongoose.model("Profile",schema);

module.exports=Profile;