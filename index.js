const express=require("express");
const app=express();
const cors=require("cors");
require("dotenv").config();
const {connection}=require("./db");
const {usersRouter}=require("./Routes/User.routes");
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("hi")
})
app.use("/users",usersRouter);
app.get("/emi",async(req,res)=>{

try{
const {loanamount,rateofinterest,tenure}=req.body;
if(!loanamount||!rateofinterest||!tenure){
    res.status(400).send("fill alll the details");
}
else{
    // EMI = ₹1,00,000 * 0.011667* (1 + 0.011667)36 / ((1 + 0.011667)36 - 1) = ₹3418.
    let roi=rateofinterest/(12*100);
    let totalemi=loanamount*roi*((1+roi)**tenure)/(((1+roi)**36)-1);
    let i=(totalemi*tenure)-loanamount;
   // console.log(roi,totalemi,i);
    let obj={
        "EMI":totalemi,
"Interest Payable":i,
"Total Payment":totalemi*tenure,
"The formula to calculate":"E = P x r x ( 1 + r )n / ( ( 1 + r )n - 1 ) "
    }
    res.status(200).send(obj);
}

}
catch(er){res.status(400).send(er.message)}
})

app.listen(process.env.PORT,async()=>{
try{
await connection;
console.log(`Connected to Port+${process.env.PORT}`);
}
catch(err){
console.log(err);
}
})