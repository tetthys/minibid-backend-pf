import { NextFunction, Request, Response } from "express";
import updateProductValidation from "../validation/updateProductValidation";

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = await updateProductValidation(req);
  return error ? next(error) : next();
};

export default updateProduct;
