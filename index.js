const express=require("express");
const app=express();
const cors=require("cors");
require("dotenv").config();
const {connection}=require("./db");
const {usersRouter}=require("./Routes/User.routes");
const {EMISRouter}=require("./Routes/Emi.routes");
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hi")
})
app.use("/users",usersRouter);
app.use(EMISRouter);

app.listen(process.env.PORT,async()=>{
try{
await connection;
console.log(`Connected to Port+${process.env.PORT}`);
}
catch(err){
console.log(err);
}
})