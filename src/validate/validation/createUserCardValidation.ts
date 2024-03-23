import Joi from "joi";
import Serene from "../../prisma/factory/Serene";
import CustomValidationError from "../error/CustomValidationError";
import useRequestValue from "../../helper/useRequestValue/useRequestValue";
import Haven from "../../tool/Haven/Haven";

const createUserCardValidation = async (req: any) => {
  try {
    const { cbody, token } = useRequestValue(req);

    const infoRule = Joi.object({
      info: Joi.string().min(4).max(255).required(),
    });
    const infoIsValid = infoRule.validate({
      info: cbody.info,
    });
    if (infoIsValid.error) {
      return infoIsValid.error;
    }

    const userFromToken = await Haven.AccessToken().findUserByToken(token);
    const user = await Serene.prisma().user.findFirstOrThrow({
      where: {
        id: userFromToken.id,
      },
      include: {
        card: true,
      },
    });
    if (user.card) {
      return new CustomValidationError("User already have a card", "user", {});
    }
  } catch (e) {
    return e;
  }
};

export default createUserCardValidation;