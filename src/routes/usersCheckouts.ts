import { Router, Request, Response, NextFunction } from "express";
import json from "../helper/json/json";
import Serene from "../prisma/factory/Serene";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import ConvertToUserCurrency from "../wrapper/wrappers/ConvertToUserCurrency";
import Haven from "../tool/Haven/Haven";

const router = Router();

/**
 * GET /users/:userId/checkouts
 */

router.get(
  "/users/:userId/checkouts",
  Haven.Auth().userId(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, page } = useRequestValue(req);
      const r = await Serene.checkouts()
        .select({
          userId: true,
          productId: true,
          state: true,
          price: true,
          createdAt: true,
        })
        .include({
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        })
        .where({
          userId: userId,
        })
        .page(page)
        .get(5);
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

export { router as usersCheckouts };
