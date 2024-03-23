import { Router, Request, Response, NextFunction } from "express";
import json from "../helper/json/json";
import Serene from "../prisma/factory/Serene";
import Haven from "../tool/Haven/Haven";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import Validate from "../validate/Validate";

const router = Router();

/**
 * POST /auth/sign-out
 * POST /auth/sign-in
 * POST /auth/register
 */

router.post(
  "/auth/sign-out",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = useRequestValue(req);
      token && (await Haven.AccessToken().delete(token));
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);
router.post(
  "/auth/sign-in",
  Validate.authSignIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cbody } = useRequestValue(req);
      const user = await Serene.user()
        .select({ id: true, username: true, currency: true })
        .where({ email: cbody.email })
        .get();
      return res
        .status(200)
        .type("json")
        .send(
          json({
            access_token: await Haven.AccessToken().setUser(user).create(),
            user: user,
          })
        );
    } catch (e) {
      next(e);
    }
  }
);
router.post(
  "/auth/register",
  Validate.authRegister,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cbody } = useRequestValue(req);
      await Serene.prisma().user.create({
        data: {
          username: cbody.username,
          phoneNumber: cbody.phoneNumber,
          dateOfBirth: new Date(cbody.dateOfBirth),
          password: await Haven.Password().hash(cbody.password),
          currency: cbody.currency,
          email: cbody.email,
        },
      });
      return res.status(201).send();
    } catch (e) {
      next(e);
    }
  }
);

export { router as auth };
