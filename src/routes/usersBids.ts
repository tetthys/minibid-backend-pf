import { Router, Request, Response, NextFunction } from "express";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import Serene from "../prisma/factory/Serene";
import ConvertToUserCurrency from "../wrapper/wrappers/ConvertToUserCurrency";
import json from "../helper/json/json";
import Haven from "../tool/Haven/Haven";

const router = Router();

/**
 * GET /users/:userId/bids
 */

router.get(
  "/users/:userId/bids",
  Haven.Auth().userId(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, page } = useRequestValue(req);
      const r = await Serene.bids()
        .where({ userId: userId })
        .orderBy({ createdAt: "desc" })
        .include({
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        })
        .exclude({
          updatedAt: true,
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

export { router as usersBids };
