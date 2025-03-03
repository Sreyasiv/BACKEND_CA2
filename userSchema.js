const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    Username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    }

})
const User=mongoose.model("User",userSchema);
module.exports=User;