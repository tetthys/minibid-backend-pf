import { NextFunction, Request, Response } from "express";
import createUserBankAccountValidation from "../validation/createUserBankAccountValidation";

const createUserBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = await createUserBankAccountValidation(req);
  return error ? next(error) : next();
};

export default createUserBankAccount;
