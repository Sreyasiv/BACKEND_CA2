require("dotenv").config()
const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
const User=require("./userSchema");
const PORT=3000;
mongoose.connect(process.env.MONGO_URI)
    .then(console.log("Database connected"))
    .catch(console.log("Error in connecting to Database"))

app.post("/usercreate",async(req,res)=>{
    const newUser=User.req.body;
    const {Username}=req.body;
    try{
        if(newUser.Username.length==0){
        res.status(400).json({message:"THe username cannot be empty",success:false});
    }
    const {email}=req.body;
    if(newUser.email.length==0){
        res.status(400).json({message:"THe email cannot be empty",success:false});
    }
    const {password}=req.body;
    if(newUser.password.length<8 || password.length>16){
        res.status(400).json({message:"The password length should be lesser than 16 or greater than 8",success:false});

    }
    res.status(201).json({message:"THe user has been saved successfully",success:true});
    }
    catch{
        res.status(500).json({message:"Internal server Error",success:false});
    }   
});
app.get("/user",async (req,res)=>{
    const getUser=req.query;
    const data=User.filter(User);
    try{
        if(data===getUser){
        res.status(200).json({message:"Data found",data,success:true});
    }
    else{
        res.status(404).json({message:"Data not found",success:false});
    }
    }
    catch(error){
        res.status(500).json({message:"Internal server Error",success:false});   
    }

});

app.listen(PORT,()=>{
    console.log(`Server is running in http://localhost:${PORT}`);
})
