import { Request, Response, NextFunction } from "express";
import Haven from "../Haven/Haven";
import useRequestValue from "../../helper/useRequestValue/useRequestValue";
import AuthError from "./error/AuthError";
import throwIf from "../../helper/throwIf/throwIf";
import throwUnless from "../../helper/throwUnless/throwUnless";
import Serene from "../../prisma/factory/Serene";

export default class Auth {
  public allow(role: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { token } = useRequestValue(req);
        const user = await Haven.AccessToken().findUserByToken(token);

        if (role === "user") {
          return next();
        }

        if (role == "admin") {
          throwIf(
            !user.admin,
            new AuthError("You are not a admin", "auth", {})
          );
          return next();
        }
      } catch (e) {
        return next(e);
      }
      return next();
    };
  }

  public userId() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { token, userId } = useRequestValue(req);
        const user = await Haven.AccessToken().findUserByToken(token);
        throwUnless(
          user.id === userId,
          new AuthError("You can't access other user's data", "auth", {})
        );
      } catch (e) {
        return next(e);
      }
      return next();
    };
  }

  public username() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { token, username } = useRequestValue(req);
        const user = await Haven.AccessToken().findUserByToken(token);
        throwUnless(
          user.username === username,
          new AuthError("You can't access other user's data", "auth", {})
        );
      } catch (e) {
        return next(e);
      }
      return next();
    };
  }

  public seller() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { token, productId } = useRequestValue(req);
        const user = await Haven.AccessToken().findUserByToken(token);
        const product = await Serene.prisma().product.findFirstOrThrow({
          where: { id: productId },
        });
        throwUnless(
          product.userId === user.id,
          new AuthError("You can't access other user's data", "auth", {})
        );
      } catch (e) {
        return next(e);
      }
      return next();
    };
  }
}
