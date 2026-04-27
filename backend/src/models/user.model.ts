import mongoose , { Document, Types } from "mongoose";

export interface IUser {
  fullname:string;
  email:string;
  password:string;
  refreshToken?:string | null,
  account?:Types.ObjectId[],
  transaction: Types.ObjectId[];
}

const userSchema=new mongoose.Schema<IUser>({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        match: /.+\@.+\..+/,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
        default:null
    },
    account:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account"
    }],
    transaction:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction"
    }]


},{
    timestamps:true
})

export const User=mongoose.model<IUser>("User",userSchema);