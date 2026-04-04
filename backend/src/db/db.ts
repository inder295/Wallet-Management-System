import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const MONGO_URI : string | undefined =process.env.MONGO_URI ;

const connectDb= async () : Promise<void> =>{
  try {

     mongoose.connect(MONGO_URI)
    .then(()=>console.log("mongodb connected successfully"))
    .catch((error)=>console.log(error))
    
    
  } catch (error) {
     console.log("Error in connected mongodb");
     
  }
}

export default connectDb;

