import { Router, Request, Response, NextFunction } from "express";
import Haven from "../tool/Haven/Haven";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import Serene from "../prisma/factory/Serene";
import Validate from "../validate/Validate";
import json from "../helper/json/json";

const router = Router();

/**
 * GET /users/:userId/bank-account
 * POST /users/:userId/bank-account
 * PUT /users/:userId/bank-account
 */

router.get(
  "/users/:userId/bank-account",
  Haven.Auth().userId(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = useRequestValue(req);
      const bankAccount = await Serene.prisma().bankAccount.findFirst({
        where: {
          id: userId,
        },
      });
      return res.status(200).send(json(bankAccount));
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/users/:userId/bank-account",
  Haven.Auth().userId(),
  Validate.createUserBankAccount,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cbody, userId } = useRequestValue(req);
      await Serene.prisma().bankAccount.create({
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
  "/users/:userId/bank-account",
  Haven.Auth().userId(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cbody, userId } = useRequestValue(req);
      await Serene.prisma().bankAccount.update({
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

export { router as userBankAccount };
