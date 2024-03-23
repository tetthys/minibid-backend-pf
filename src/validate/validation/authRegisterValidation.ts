import Joi from "joi";
import Serene from "../../prisma/factory/Serene";
import CustomValidationError from "../error/CustomValidationError";
import supportedCurrencies from "../../data/supportedCurrencies";
import useRequestValue from "../../helper/useRequestValue/useRequestValue";

const authRegisterValidation = async (req: any) => {
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
  const isEmailExist = await Serene.prisma().user.findUnique({
    where: {
      email: cbody.email,
    },
  });
  if (isEmailExist) {
    return new CustomValidationError('"email" already exist', "email", {});
  }

  const emailCodeRule = Joi.object({
    emailCode: Joi.string().min(6).max(6).required(),
  });
  const emailCodeValid = emailCodeRule.validate({
    emailCode: cbody.emailCode,
  });
  if (emailCodeValid.error) {
    return emailCodeValid.error;
  }

  // if (!(await Haven.EmailCode().verify(cbody.emailCode, "info"))) {
  //   return new Error("Invalid emailCode");
  // }

  const phoneNumberRule = Joi.object({
    phoneNumber: Joi.string().min(4).max(20).required(),
  });
  const phoneNumberValid = phoneNumberRule.validate({
    phoneNumber: cbody.phoneNumber,
  });
  if (phoneNumberValid.error) {
    return phoneNumberValid.error;
  }

  const phoneNumberCodeRule = Joi.object({
    phoneNumberCode: Joi.string().min(6).max(6).required(),
  });
  const phoneNumberCodeValid = phoneNumberCodeRule.validate({
    phoneNumberCode: cbody.phoneNumberCode,
  });
  if (phoneNumberCodeValid.error) {
    return phoneNumberCodeValid.error;
  }

  // if (!(await Haven.PhoneNumberCode().verify(cbody.phoneNumberCode, "info"))) {
  //   return new Error("Invalid phoneNumberCode");
  // }

  const usernameRule = Joi.object({
    username: Joi.string().alphanum().min(8).max(20).required(),
  });
  const usernameValid = usernameRule.validate({
    username: cbody.username,
  });
  if (usernameValid.error) {
    return usernameValid.error;
  }
  const isUsernameExist = await Serene.prisma().user.findUnique({
    where: {
      username: cbody.username,
    },
  });
  if (isUsernameExist) {
    return new CustomValidationError(
      '"username" already exist',
      "username",
      {}
    );
  }

  const currencyRule = Joi.object({
    currency: Joi.string().required(),
  });
  const currencyValid = currencyRule.validate({
    currency: cbody.currency,
  });
  if (currencyValid.error) {
    return currencyValid.error;
  }
  if (!supportedCurrencies.includes(cbody.currency)) {
    return new CustomValidationError(
      '"currency" is not supported',
      "currency",
      {}
    );
  }

  const dateOfBirthRule = Joi.object({
    dateOfBirth: Joi.date().required(),
  });
  const dateOfBirthValid = dateOfBirthRule.validate({
    dateOfBirth: cbody.dateOfBirth,
  });
  if (dateOfBirthValid.error) {
    return dateOfBirthValid.error;
  }

  const passwordRule = Joi.object({
    password: Joi.string().min(8).max(20).required(),
  });
  const passwordValid = passwordRule.validate({
    password: cbody.password,
  });
  if (passwordValid.error) {
    return passwordValid.error;
  }

  const confirmPasswordRule = Joi.object({
    confirmPassword: Joi.string().valid(cbody.password).required(),
  });
  const confirmPasswordValid = confirmPasswordRule.validate({
    confirmPassword: cbody.confirmPassword,
  });
  if (confirmPasswordValid.error) {
    return confirmPasswordValid.error;
  }
};

export default authRegisterValidation;
