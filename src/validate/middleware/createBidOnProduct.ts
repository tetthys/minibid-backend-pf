import { NextFunction, Request, Response } from "express";
import createBidOnProductValidation from "../validation/createBidOnProductValidation";

const createBidOnProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = await createBidOnProductValidation(req);
  return error ? next(error) : next();
};

export default createBidOnProduct;
