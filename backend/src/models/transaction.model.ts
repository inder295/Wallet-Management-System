import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({

    from:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    to:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number,
    },
    status:{
        tyep:String,
        enum:["SUCCESS","FAIL","PENDING"],
        default:"PENDING"
    },
    type:{
        tyep:String,
        enum:["Credit",'DEBIT']
    },
    description:{
        type:String,
    },

 
},{
    timestamps:true
})

export const Transaction=mongoose.model("Transaction",transactionSchema);