import Haven from "../../../../src/tool/Haven/Haven";
import createValidToken from "../utils/createValidToken";

describe("findUserByToken", () => {
  it("return user on valid token", async () => {
    const validToken = await createValidToken();
    const user = await Haven.AccessToken().findUserByToken(validToken);
    expect(user).toBeTruthy();
  });
});
