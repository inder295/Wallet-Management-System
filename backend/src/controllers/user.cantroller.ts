import { Request,Response } from "express";
import { IUser, User } from "../models/user.model";
import { registerSchema } from "../validations/user.validation";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import  jwt  from "jsonwebtoken";

dotenv.config();

const salt=Number(process.env.SALT) ;

export const registerUser = async (req:Request,res:Response) :Promise<Response> =>{

    const result  =registerSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message:"Data validation failed.",
            error:result.error.issues
        })
    }
  
    const {fullname,email,password} : IUser =req.body;

    if(!fullname || !email  || !password){
        return res.status(400).json({
            message:"Please fill all the fields."
        })
    }

    try {

        const userExist=await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                message:"User already exists."
            })
        }

        
        const hashPassword=await bcrypt.hash(password,salt);
        const user=new User({fullname,email,password:hashPassword});


        await user.save();

        return res.status(200).json({
            message:"User registration done.",
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error."
        })
    }


}

export const loginUser=async(req:Request,res:Response) : Promise<Response> => {
   
    const {email,password} : IUser =req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Please send all the credenials",
        })
    }

    try { 

        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }

        const checkPassword=await bcrypt.compare(password,user.password);

        if(!checkPassword){
            return res.status(400).json({
                message:"Please fill valid credenials."
            })
        }

        const refreshToken=jwt.sign({userId:user._id},process.env.ACCESS_JWT_SECRET,{expiresIn:'7d'});
        const accessToken=jwt.sign({userId:user._id},process.env.REFRESH_JWT_SECRET,{expiresIn:'10m'});

        user.refreshToken=refreshToken;
        
        await user.save();

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:1000*60*60*24*7
        })

        return res.status(200).json({
            message:"User loggedin successfully.",
            accessToken:accessToken
        })

        
    } catch (error) {
       return res.status(400).json({
        message:"Error in login.",
        error:error.message
       })   
    }

}

