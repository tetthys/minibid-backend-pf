import Serene from "../../../../src/prisma/factory/Serene";
import Haven from "../../../../src/tool/Haven/Haven";

describe("create", () => {
  it("create token on valid user", async () => {
    const validUser = await Serene.user().getById(1);
    const token = await Haven.AccessToken().setUser(validUser).create();
    expect(token).toBeTruthy();
  });
});
