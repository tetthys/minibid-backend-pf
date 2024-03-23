import InvalidAccessTokenError from "../../../../../src/tool/AccessToken/error/InvalidAccessTokenError";
import Haven from "../../../../../src/tool/Haven/Haven";

describe("error", () => {
  it("throw error on invalid user", async () => {
    const invalidUser = {
      id: 9999,
    };
    const at = async () => {
      await Haven.AccessToken().setUser(invalidUser).create();
    };
    await expect(at()).rejects.toThrow(InvalidAccessTokenError);
  });
});
