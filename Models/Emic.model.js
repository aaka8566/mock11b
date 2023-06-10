const mongoose=require("mongoose");
const emiSchema=mongoose.Schema({
"loanamount":Number,
"rateofinterest":Number,
"tenure":Number,
});
const Emismodel=mongoose.model("emi",emiSchema);
module.exports={Emismodel};