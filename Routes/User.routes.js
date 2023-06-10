const express=require("express");
const usersRouter=express.Router();
const {Usersmodel}=require("../Models/User.model");
const jwt=require('jsonwebtoken');
const bcrypt=require("bcrypt");
// Usersmodel.get("/register",async(req,res)=>{
//     console.log("bye");
//     res.end();
// })
usersRouter.post("/register",async(req,res)=>{
  
    try{
const {password}=req.body;
console.log(req.body);
bcrypt.hash(password, 5,async function(err, hash) {
    if(err){
        res.status(500).send(err);
    }
    req.body.password=hash;
    const users=await Usersmodel(req.body);
    await users.save();
    res.status(200).send("new user added successfully");

});
    }
    catch(err){
        res.status(500).send(err);
    }
});
usersRouter.post("/login",async(req,res)=>{
    try{
const {email,password}=req.body;
const user=await Usersmodel.findOne({email});

if(user){
    
    bcrypt.compare(password, user.password,function(err,result) {
        console.log("hi");
       if(result){
    const token = jwt.sign({ "name":user.name,"email":user.email }, 'shhhhh');
           res.status(200).send({"token":token});
       }
       else{
           res.status(404).send("password is incorrect");
       }
    });
}
else{
    res.status(404).send("user not found");
}
    }
    catch(err){
        res.status(500).send(err);
    }
});



usersRouter.get("/getprofile",async(req,res)=>{
    try{
 const {token}=req.headers;
console.log(req.headers);
if(token){
    const decoded = jwt.verify(token, 'shhhhh');
    if(decoded){
        res.status(200).send(decoded);
    }
    else{
        res.status(404).send("error"); 
    }
}
else{
    res.status(404).send("user not found");
}
    }
    catch(err){
        res.status(500).send(err);
    }
// res.status(200).send("decoded");
});


module.exports={usersRouter};