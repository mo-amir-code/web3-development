import { Request } from "express";
import { FromType, OriginType } from "./index.ts";
import { UserType } from "./controllers/user.ts";

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      user: UserType; // Add the 'user' property of any type
    }
  }
}
