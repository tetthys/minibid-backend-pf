import { ValidationError } from "joi";
import CustomValidationError from "./error/CustomValidationError";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import json from "../helper/json/json";
import AuthError from "../tool/Auth/error/AuthError";
import InvalidAccessTokenError from "../tool/AccessToken/error/InvalidAccessTokenError";
import Haven from "../tool/Haven/Haven";

const handle = (e: any): Function => {
  if (e instanceof ValidationError) {
    return (req: Request, res: Response) =>
      res.status(400).type("json").send(json(e.details));
  }
  if (e instanceof CustomValidationError) {
    return (req: Request, res: Response) =>
      res.status(400).type("json").send(json(e.get()));
  }
  if (e instanceof AuthError) {
    return (req: Request, res: Response) =>
      res.status(400).type("json").send(json(e.get()));
  }
  if (e instanceof InvalidAccessTokenError) {
    return (req: Request, res: Response) =>
      res.status(400).type("json").send(json(e.get()));
  }
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    return (req: Request, res: Response) =>
      res.status(500).type("json").send(json(e.message));
  }
  return (req: Request, res: Response) => {
    Haven.Log().error(e);
    console.log("\n\n\nINTERNAL SERVER ERROR");
    console.log(e);
    return res
      .status(500)
      .type("json")
      .send(
        json([{ message: "INTERNAL SERVER ERROR", field: "", details: "" }])
      );
  };
};

export default handle;
