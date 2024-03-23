import { Router, Request, Response, NextFunction } from "express";
import json from "../helper/json/json";
import Serene from "../prisma/factory/Serene";
import ConvertToUserCurrency from "../wrapper/wrappers/ConvertToUserCurrency";
import Haven from "../tool/Haven/Haven";
import useRequestValue from "../helper/useRequestValue/useRequestValue";

const router = Router();

/**
 * GET /users
 * GET /users/:userId
 * GET /users/username/:username
 */

router.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page } = useRequestValue(req);
      const r = await Serene.users()
        .select({
          id: true,
          username: true,
          dateOfBirth: true,
          createdAt: true,
        })
        .with({
          countOfUserBought: true,
          countOfUserSold: true,
          sumOfUserBought: true,
          sumOfUserSold: true,
          countOfBidding: true,
          creditLevel: true,
        })
        .page(page)
        .get(15);
      return res.status(200).type("json").send(json(r));
    } catch (e) {
      next(e);
    }
  }
);
router.get(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = useRequestValue(req);
      const r = await Serene.user()
        .select({
          id: true,
          username: true,
          dateOfBirth: true,
          createdAt: true,
        })
        .where({
          id: userId,
        })
        .with({
          countOfUserBought: true,
          countOfUserSold: true,
          sumOfUserBought: true,
          sumOfUserSold: true,
          countOfBidding: true,
          creditLevel: true,
        })
        .get();
      return res.status(200).type("json").send(json(r));
    } catch (e) {
      next(e);
    }
  }
);
router.get(
  "/users/username/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, token } = useRequestValue(req);
      let selectArgs: any = {
        id: true,
        username: true,
        dateOfBirth: true,
        createdAt: true,
      };
      if (
        token &&
        (await Haven.AccessToken().findUserByToken(token)).username === username
      ) {
        selectArgs = {
          ...selectArgs,
          phoneNumber: true,
          email: true,
        };
      }
      const r = await Serene.user()
        .select(selectArgs)
        .where({
          username: username,
        })
        .with({
          countOfUserBought: true,
          countOfUserSold: true,
          sumOfUserBought: true,
          sumOfUserSold: true,
          countOfBidding: true,
          creditLevel: true,
        })
        .get();
      const w = await new ConvertToUserCurrency()
        .setRequest(req)
        .setResult(r)
        .get();
      return res.status(200).type("json").send(json(w));
    } catch (e) {
      next(e);
    }
  }
);

export { router as users };
