import env from "../../../../src/helper/env/env";
import CannotReadEnvVariableError from "../../../../src/helper/env/error/CannotReadEnvVariableError";

describe("error", () => {
  it("if variable is undefined, throw CannotReadEnvVariableError", async () => {
    expect(() => env("UNDEFINED_VARIABLE")).toThrow(CannotReadEnvVariableError);
  });
});
