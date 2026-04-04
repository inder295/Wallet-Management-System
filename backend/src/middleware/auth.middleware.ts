import dotenv from "dotenv"
import { NextFunction,Request,Response } from "express";
import jwt  from "jsonwebtoken";

dotenv.config();

export const checkauth=async(req:Request,res:Response,next:NextFunction)=>{

    const authHeader=req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({
            message:"Headers are missing.",
        })
    }

    const userAccessToken=authHeader.split(" ")[1];

    const decode=jwt.verify(userAccessToken,process.env.ACCESS_JWT_SECRET);
}