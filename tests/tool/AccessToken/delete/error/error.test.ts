import InvalidAccessTokenError from "../../../../../src/tool/AccessToken/error/InvalidAccessTokenError";
import Haven from "../../../../../src/tool/Haven/Haven";
import Helper from "../../../../../src/tool/Helper/Helper";

describe("error", () => {
  it("throw error on invalid token", async () => {
    const invalidToken = Helper.faker().string.alpha(255);
    const at = async () => {
      await Haven.AccessToken().delete(invalidToken);
    };
    await expect(at()).rejects.toThrow(InvalidAccessTokenError);
  });
});
