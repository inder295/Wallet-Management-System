import mongoose from "mongoose";

export interface IUser {
  fullname:string;
  email:string;
  password:string;
  refreshToken:string
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
        type:String
    }

},{
    timestamps:true
})

export const User=mongoose.model<IUser>("User",userSchema);