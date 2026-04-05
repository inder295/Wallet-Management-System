import dotenv from "dotenv"
import { NextFunction,Request,Response } from "express";
import jwt,  { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";

dotenv.config();

export const checkauth=async(req:Request,res:Response,next:NextFunction)=>{


    try {

        const authHeader=req.headers.authorization;
    
        if(!authHeader){
            return res.status(401).json({
                message:"Headers are missing.",
            })
        }

        const userAccessToken=authHeader.split(" ")[1];

        const decode =await jwt.verify(userAccessToken,process.env.ACCESS_JWT_SECRET) as JwtPayload;

        const user=await User.findById(decode);

        if(!user){
            return res.status(401).json({
                message:"User not found.",
            })
        }

        req.user=user;
        
        next();

        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid token."
        })
    }

    

}