import { Router, Request, Response, NextFunction } from "express";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import Haven from "../tool/Haven/Haven";
import Serene from "../prisma/factory/Serene";
import Validate from "../validate/Validate";
import json from "../helper/json/json";

const router = Router();

/**
 * GET /users/:userId/card
 * POST /users/:userId/card
 * PUT /users/:userId/card
 */

router.get(
  "/users/:userId/card",
  Haven.Auth().userId(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = useRequestValue(req);
      const card = await Serene.prisma().card.findFirst({
        where: {
          id: userId,
        },
      });
      return res.status(200).send(json(card));
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/users/:userId/card",
  Haven.Auth().userId(),
  Validate.createUserCard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cbody, userId } = useRequestValue(req);
      await Serene.prisma().card.create({
        data: {
          info: cbody.info,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return res.status(201).send();
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/users/:userId/card",
  Haven.Auth().userId(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cbody, userId } = useRequestValue(req);
      await Serene.prisma().card.update({
        where: {
          id: userId,
        },
        data: {
          info: cbody.info,
        },
      });
      return res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
);

export { router as userCard };
