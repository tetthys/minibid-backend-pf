import { NextFunction, Request, Response } from "express";
import createUserCardValidation from "../validation/createUserCardValidation";

const createUserCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = await createUserCardValidation(req);
  return error ? next(error) : next();
};

export default createUserCard;
