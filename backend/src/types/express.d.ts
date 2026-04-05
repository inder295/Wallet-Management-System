import { User } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: any; // or better: user?: typeof User
    }
  }
}