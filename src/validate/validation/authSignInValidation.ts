import Joi from "joi";
import Serene from "../../prisma/factory/Serene";
import CustomValidationError from "../error/CustomValidationError";
import Haven from "../../tool/Haven/Haven";
import useRequestValue from "../../helper/useRequestValue/useRequestValue";

const authSignInValidation = async (req: any) => {
  const { cbody } = useRequestValue(req);

  const emailRule = Joi.object({
    email: Joi.string().email().required(),
  });
  const emailValid = emailRule.validate({
    email: cbody.email,
  });
  if (emailValid.error) {
    return emailValid.error;
  }

  const isEmailNotExist = !(await Serene.prisma().user.findUnique({
    where: {
      email: cbody.email,
    },
  }));
  if (isEmailNotExist) {
    return new CustomValidationError('"email" doesn\'t exist', "email", {});
  }

  const passwordRule = Joi.object({
    password: Joi.string().required(),
  });
  const passwordValid = passwordRule.validate({
    password: cbody.password,
  });
  if (passwordValid.error) {
    return passwordValid.error;
  }

  const user = await Serene.prisma().user.findUniqueOrThrow({
    where: {
      email: cbody.email,
    },
  });
  const isPasswordWrong = !(await Haven.Password().verify(
    cbody.password,
    user.password
  ));
  if (isPasswordWrong) {
    return new CustomValidationError('"password" is incorrect', "password", {});
  }
};

export default authSignInValidation;
