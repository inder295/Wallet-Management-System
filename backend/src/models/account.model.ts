import mongoose from "mongoose";

const accountSchema=new mongoose.Schema({
    
    userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
       },
   
       accountNumber:{ 
           type:String,
           required:true
       },
       expiry:{
           type:String,
           required:true,
       },
       cvv:{
           type:String,
       },
       status:{
           enum:['ACTIVE','INACTIVE'],
           default:'ACTIVE'
       }
},{
    timestamps:true
})

export const Account=mongoose.model("Account",accountSchema);