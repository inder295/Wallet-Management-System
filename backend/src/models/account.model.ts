import mongoose from "mongoose";

const accountSchema=new mongoose.Schema({
    
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },

    balance:{
        type:Number,
        default:0,
    },
    currency:{
        type:String,
        default:"dollar"
    },
    status:{
        type:Boolean,
        default:true
    },
    pin:{
        type:String,
    }
},{
    timestamps:true
})

export const Account=mongoose.model("Account",accountSchema)