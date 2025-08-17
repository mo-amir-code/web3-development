import { JWT_SECRET_KEY } from "../../../config/constants.js";
import jwt from "jsonwebtoken";
import { JWTTokenVerifierType } from "../../../types/controllers/v1/auth.js";

const JWTTokenVerifier = (token: string): JWTTokenVerifierType | null => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY as string) as JWTTokenVerifierType;
  } catch (err) {
    return null;
  }
};

export { JWTTokenVerifier };
