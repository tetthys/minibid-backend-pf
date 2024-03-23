import { Router, Request, Response, NextFunction } from "express";
import Event from "../event/Event";
import UserPlaceBid from "../event/events/UserPlaceBid";
import Serene from "../prisma/factory/Serene";
import Haven from "../tool/Haven/Haven";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import Validate from "../validate/Validate";

const router = Router();

/**
 * POST /products/:productId/bids
 */

router.post(
  "/products/:productId/bids",
  Haven.Auth().allow("user"),
  Validate.createBidOnProduct,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, token, cbody } = useRequestValue(req);
      const user = await Haven.AccessToken().findUserByToken(token);
      const product = await Serene.product().getById(productId);
      Event.occur(
        new UserPlaceBid().from(user).to(product).for(cbody.biddingPrice)
      );
      return res.status(200).json({ message: "success" });
    } catch (e) {
      next(e);
    }
  }
);

export { router as productsBids };
