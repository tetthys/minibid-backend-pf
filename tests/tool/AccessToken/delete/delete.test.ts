import Serene from "../../../../src/prisma/factory/Serene";
import Haven from "../../../../src/tool/Haven/Haven";
import createValidToken from "../utils/createValidToken";

describe("delete", () => {
  it("delete a valid token", async () => {
    const validToken = await createValidToken();
    await Haven.AccessToken().delete(validToken);
    const mustBeFalse = await Serene.prisma().accessToken.findFirst({
      where: {
        token: validToken,
      },
    });
    expect(mustBeFalse).toBeFalsy();
  });
});
