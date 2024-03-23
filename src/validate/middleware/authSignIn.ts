import { NextFunction, Request, Response } from "express";
import authSignInValidation from "../validation/authSignInValidation";

const authSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const error = await authSignInValidation(req);
  return error ? next(error) : next();
};

export default authSignIn;
