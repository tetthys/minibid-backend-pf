import { Router, Request, Response, NextFunction } from "express";
import json from "../helper/json/json";
import Serene from "../prisma/factory/Serene";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import ConvertToUserCurrency from "../wrapper/wrappers/ConvertToUserCurrency";

const router = Router();

/**
 * GET /users/:userId/products
 * GET /users/username/:username/products
 */

router.get(
  "/users/:userId/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, page } = useRequestValue(req);
      const r = await Serene.products()
        .where({ userId: userId })
        .with({ countOfUserBidding: true, highestBiddingPrice: true })
        .page(page)
        .get(15);
      return res.status(200).send(json(r));
    } catch (e) {
      next(e);
    }
  }
);
router.get(
  "/users/username/:username/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, page } = useRequestValue(req);
      const user = await Serene.user().where({ username: username }).get();
      const r = await Serene.products()
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
        .where({ userId: user.id })
        .with({ countOfUserBidding: true, highestBiddingPrice: true })
        .page(page)
        .get(15);
      const w = await new ConvertToUserCurrency()
        .setRequest(req)
        .setResult(r)
        .get();
      return res.status(200).send(json(w));
    } catch (e) {
      next(e);
    }
  }
);

export { router as usersProducts };
