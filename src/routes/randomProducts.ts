import { Router, Request, Response, NextFunction } from "express";
import Serene from "../prisma/factory/Serene";
import ConvertToUserCurrency from "../wrapper/wrappers/ConvertToUserCurrency";
import json from "../helper/json/json";
import _ from "lodash";

const router = Router();

/**
 * GET /random-products
 */

router.get(
  "/random-products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allIds = await Serene.prisma().product.findMany({
        select: {
          id: true,
        },
        where: {
          endAt: {
            gt: new Date(),
          },
        },
      });
      const randomIds = _.shuffle(allIds)
        .slice(0, 15)
        .map((e) => e.id);
      const r = await Serene.products()
        .where({
          id: {
            in: randomIds,
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
        .mix()
        .with({
          countOfUserBidding: true,
          highestBiddingPrice: true,
        })
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

export { router as randomProducts };
