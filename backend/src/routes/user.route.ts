import { Router } from "express";
import { check, loginUser, logout, refreshtoken, registerUser } from "../controllers/user.cantroller";
import { checkauth } from "../middleware/auth.middleware";

const userRouter=Router();


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser);
userRouter.get('/check',checkauth,check);
userRouter.post('/refresh-token',refreshtoken)
userRouter.post('/logout',checkauth,logout);


export default userRouter;