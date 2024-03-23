import Joi from "joi";
import Serene from "../../prisma/factory/Serene";
import CustomValidationError from "../error/CustomValidationError";
import useRequestValue from "../../helper/useRequestValue/useRequestValue";

const createNewProductValidation = async (req: any) => {
  const { cbody } = useRequestValue(req);

  const nameRule = Joi.object({
    name: Joi.string().min(1).max(255).required(),
  });
  const nameIsValid = nameRule.validate({
    name: cbody.name,
  });
  if (nameIsValid.error) {
    return nameIsValid.error;
  }

  const startingPriceRule = Joi.object({
    startingPrice: Joi.number().min(0).required(),
  });
  const startingPriceIsValid = startingPriceRule.validate({
    startingPrice: cbody.startingPrice,
  });
  if (startingPriceIsValid.error) {
    return startingPriceIsValid.error;
  }

  const shortDescriptionRule = Joi.object({
    shortDescription: Joi.string().min(1).max(255).required(),
  });
  const shortDescriptionIsValid = shortDescriptionRule.validate({
    shortDescription: cbody.shortDescription,
  });
  if (shortDescriptionIsValid.error) {
    return shortDescriptionIsValid.error;
  }

  const endAtRule = Joi.object({
    endAt: Joi.date().required(),
  });
  const endAtIsValid = endAtRule.validate({
    endAt: cbody.endAt,
  });
  if (endAtIsValid.error) {
    return endAtIsValid.error;
  }

  const descriptionRule = Joi.object({
    description: Joi.string().min(1).max(10000).required(),
  });
  const descriptionIsValid = descriptionRule.validate({
    description: cbody.description,
  });
  if (descriptionIsValid.error) {
    return descriptionIsValid.error;
  }

  const categoriesRule = Joi.object({
    categories: Joi.array().unique().items(Joi.number()).required(),
  });
  const categoriesIsValid = categoriesRule.validate({
    categories: cbody.categories,
  });
  if (categoriesIsValid.error) {
    return categoriesIsValid.error;
  }

  for (const categoryId of cbody.categories) {
    const isCategoryNotExist = !(await Serene.prisma().category.findFirst({
      where: {
        id: categoryId,
      },
    }));
    if (isCategoryNotExist) {
      return new CustomValidationError(
        `"category" is not valid`,
        "category",
        {}
      );
    }
  }

  const productImagesRule = Joi.object({
    productImages: Joi.array().min(1).max(6).items(Joi.string()).required(),
  });
  const productImagesIsValid = productImagesRule.validate({
    productImages: cbody.productImages,
  });
  if (productImagesIsValid.error) {
    return productImagesIsValid.error;
  }
};

export default createNewProductValidation;
