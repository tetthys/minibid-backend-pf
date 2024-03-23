import { Router, Request, Response, NextFunction } from "express";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import Serene from "../prisma/factory/Serene";
import ConvertToUserCurrency from "../wrapper/wrappers/ConvertToUserCurrency";
import json from "../helper/json/json";

const router = Router();

/**
 * GET /search
 */

router.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, page } = useRequestValue(req);
      const r = await Serene.products()
        .where({
          name: {
            contains: name,
          },
          endAt: {
            gt: new Date(),
          },
        })
        .exclude({
          userId: true,
          shortDescription: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        })
        .include({
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        })
        .with({ countOfUserBidding: true, highestBiddingPrice: true })
        .page(page)
        .get(15);
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

export { router as search };
