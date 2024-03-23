import { Router, Request, Response, NextFunction } from "express";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import Serene from "../prisma/factory/Serene";
import ConvertToUserCurrency from "../wrapper/wrappers/ConvertToUserCurrency";
import json from "../helper/json/json";
import Haven from "../tool/Haven/Haven";

const router = Router();

/**
 * GET /users/:userId/withdrawals
 */

router.get(
  "/users/:userId/withdrawals",
  Haven.Auth().userId(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, page } = useRequestValue(req);
      const r = await Serene.withdrawals()
        .where({
          userId: userId,
        })
        .orderBy({
          createdAt: "desc",
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

export { router as usersWithdrawals };
