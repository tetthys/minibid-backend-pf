import { NextFunction, Request, Response } from "express";
import authRegisterValidation from "../validation/authRegisterValidation";

const authRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = await authRegisterValidation(req);
  return error ? next(error) : next();
};

export default authRegister;
