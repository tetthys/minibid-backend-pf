import "dotenv/config";
import CannotReadEnvVariableError from "./error/CannotReadEnvVariableError";

const env = (variableName: string): any => {
  const variable = process.env[variableName];
  if (variable === undefined) {
    throw new CannotReadEnvVariableError(
      "Cannot read environment variable",
      "env",
      {}
    );
  }
  return variable;
};

export default env;
