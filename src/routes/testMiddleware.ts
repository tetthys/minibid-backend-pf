import { Router, Request, Response, NextFunction } from "express";
import Validate from "../validate/Validate";
import Haven from "../tool/Haven/Haven";

const router = Router();

/**
 * /test/middeware
 */

router.get("/test/middleware", async (req: Request, res: Response) => {
  res.status(200).send();
});

router.post(
  "/test/middleware/createBidOnProduct",
  Validate.createBidOnProduct,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/test/middleware/authRegister",
  Validate.authRegister,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/test/middleware/authSignIn",
  Validate.authSignIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/test/middleware/createNewProduct",
  Validate.createNewProduct,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/test/middleware/updateProduct",
  Validate.updateProduct,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/test/middleware/createUserCard",
  Validate.createUserCard,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/test/middleware/createUserBankAccount",
  Validate.createUserBankAccount,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/test/authcase/user",
  Haven.Auth().allow("user"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/test/authcase/admin",
  Haven.Auth().allow("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/test/authcase/user/userId/:userId",
  Haven.Auth().userId(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/test/authcase/user/username/:username",
  Haven.Auth().username(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/test/authcase/product/:productId",
  Haven.Auth().seller(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

export { router as testMiddleware };
