import { NextFunction, Request, Response } from "express";
import createNewProductValidation from "../validation/createNewProductValidation";

const createNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = await createNewProductValidation(req);
  return error ? next(error) : next();
};

export default createNewProduct;
