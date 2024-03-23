import { Router, Request, Response, NextFunction } from "express";
import json from "../helper/json/json";
import Serene from "../prisma/factory/Serene";
import ConvertToUserCurrency from "../wrapper/wrappers/ConvertToUserCurrency";
import Haven from "../tool/Haven/Haven";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import Validate from "../validate/Validate";

const router = Router();

/**
 * GET /products
 * GET /products/:productId
 * GET /products/:productId/edit
 * POST /products
 * PUT /products/:productId
 */

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page } = useRequestValue(req);
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
        .where({
          endAt: {
            gt: new Date(),
          },
        })
        .orderBy({
          createdAt: "desc",
        })
        .mix()
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
router.get(
  "/products/:productId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = useRequestValue(req);
      const r = await Serene.product()
        .where({ id: productId })
        .with({ countOfUserBidding: true, highestBiddingPrice: true })
        .include({
          productImages: true,
          bids: true,
          user: true,
          productCategories: {
            include: {
              category: true,
            },
          },
        })
        .get();
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
router.get(
  "/products/:productId/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = useRequestValue(req);
      const r = await Serene.product()
        .where({ id: productId })
        .include({
          productCategories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          productImages: {
            select: {
              id: true,
              path: true,
            },
          },
        })
        .get();
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
router.post(
  "/products",
  Haven.Auth().allow("user"),
  Validate.createNewProduct,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, cbody } = useRequestValue(req);
      const user = await Haven.AccessToken().findUserByToken(token);
      const product = await Serene.prisma().product.create({
        data: {
          userId: user.id,
          name: cbody.name,
          shortDescription: cbody.shortDescription,
          description: cbody.description,
          startingPrice: await Haven.Currency()
            .from(user.currency)
            .amount(cbody.startingPrice)
            .to("USD")
            .convert(),
          endAt: new Date(cbody.endAt),
          productCategories: {
            create: cbody.categories.map((categoryId: number) => ({
              categoryId: categoryId,
            })),
          },
          productImages: {
            create: [
              ...cbody.productImages.map((path: string) => ({
                path: path,
              })),
            ],
          },
        },
      });
      return res.status(200).send(
        json({
          message: "success",
          product: {
            id: product.id,
            name: product.name,
          },
        })
      );
    } catch (e) {
      next(e);
    }
  }
);
router.put(
  "/products/:productId",
  Haven.Auth().seller(),
  Validate.updateProduct,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, cbody, productId } = useRequestValue(req);
      const user = await Haven.AccessToken().findUserByToken(token);
      const updated = await Serene.prisma().product.update({
        where: {
          id: productId,
        },
        data: {
          name: cbody.name,
          shortDescription: cbody.shortDescription,
          description: cbody.description,
          startingPrice: await Haven.Currency()
            .from(user.currency)
            .amount(cbody.startingPrice)
            .to("USD")
            .convert(),
          endAt: new Date(cbody.endAt),
        },
      });

      await Serene.prisma().productCategory.deleteMany({
        where: {
          productId: productId,
        },
      });
      await Serene.prisma().productCategory.createMany({
        data: cbody.categories.map((categoryId: number) => ({
          productId: productId,
          categoryId: categoryId,
        })),
      });

      await Serene.prisma().productImage.deleteMany({
        where: {
          productId: productId,
        },
      });
      await Serene.prisma().productImage.createMany({
        data: cbody.productImages.map((path: string) => ({
          productId: productId,
          path: path,
        })),
      });

      return res.status(200).send(
        json({
          message: "success",
          product: {
            id: updated.id,
            name: updated.name,
          },
        })
      );
    } catch (e) {
      next(e);
    }
  }
);

export { router as products };
