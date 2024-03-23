import Joi from "joi";
import useRequestValue from "../../helper/useRequestValue/useRequestValue";
import Serene from "../../prisma/factory/Serene";
import CustomValidationError from "../error/CustomValidationError";
import Haven from "../../tool/Haven/Haven";

const createBidOnProductValidation = async (req: any) => {
  const { token, cbody } = useRequestValue(req);

  const productIdRule = Joi.object({
    productId: Joi.number().required(),
  });
  const productIdValid = productIdRule.validate({
    productId: cbody.productId,
  });
  if (productIdValid.error) {
    return productIdValid.error;
  }

  const biddingPriceRule = Joi.object({
    biddingPrice: Joi.number().required(),
  });
  const biddingPriceValid = biddingPriceRule.validate({
    biddingPrice: cbody.biddingPrice,
  });
  if (biddingPriceValid.error) {
    return biddingPriceValid.error;
  }

  const product = await Serene.prisma().product.findUnique({
    where: {
      id: cbody.productId,
    },
  });
  if (!product) {
    return new CustomValidationError(`"product" doesn\'t exist`, "product", {});
  }

  const isProductEnd = new Date(product.endAt) < new Date();
  if (isProductEnd) {
    return new CustomValidationError(
      `"product" is already ended`,
      "product",
      {}
    );
  }

  try {
    const user = await Haven.AccessToken().findUserByToken(token);

    if (!user.card) {
      return new CustomValidationError(
        `"card" doesn't exist. Please add a card first.`,
        "card",
        {}
      );
    }

    if (!user.bankAccount) {
      return new CustomValidationError(
        `"bank_account" doesn't exist. Please add a bank account first.`,
        "bank_account",
        {}
      );
    }

    // if ((await Haven.Balance().info({}).check()) === false) {
    //   return new CustomValidationError(
    //     `Your balance is insufficient to bid`,
    //     "balance",
    //     {}
    //   );
    // }

    const convertedBiddingPrice = await Haven.Currency()
      .from(user.currency)
      .amount(cbody.biddingPrice)
      .to("usd")
      .convert();

    const isBiddingPriceGreaterThanStartingPrice =
      Number(product.startingPrice) < Number(convertedBiddingPrice);
    if (!isBiddingPriceGreaterThanStartingPrice) {
      return new CustomValidationError(
        `"bidding_price" must be greater than "starting_price"`,
        "bidding_price",
        {}
      );
    }

    const isBiddingPriceGreaterThanLastBiddingPrice =
      await Serene.prisma().bid.findFirst({
        where: {
          AND: [
            {
              productId: cbody.productId,
            },
            {
              biddingPrice: {
                gt: convertedBiddingPrice,
              },
            },
          ],
        },
      });
    if (isBiddingPriceGreaterThanLastBiddingPrice) {
      return new CustomValidationError(
        `"bidding_price" must be greater than last bidding price`,
        "bidding_price",
        {}
      );
    }
  } catch (e) {
    return e;
  }
};

export default createBidOnProductValidation;
