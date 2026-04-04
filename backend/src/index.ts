import express, { Request, Response } from "express";
import dotenv from "dotenv"
import connnectDb from "./db/db";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser"


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());


app.get("/", (req: Request, res: Response) => {
  res.send("Hello from wallet system 🚀");
});

app.use('/api/v1/user',userRouter)

app.listen(PORT, () => {
    connnectDb();
  console.log(`Server running on port : ${PORT}`);
});