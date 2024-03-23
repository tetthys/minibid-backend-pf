import Serene from "../../../../src/prisma/factory/Serene";
import Haven from "../../../../src/tool/Haven/Haven";
import Helper from "../../../../src/tool/Helper/Helper";

const seedFakeTokensOfUser = async (validUser: any) => {
  await Serene.prisma().accessToken.createMany({
    data: [
      {
        userId: validUser.id,
        token: Helper.faker().string.alpha(255),
        expiredAt: Helper.faker().date.future(),
      },
      {
        userId: validUser.id,
        token: Helper.faker().string.alpha(255),
        expiredAt: Helper.faker().date.future(),
      },
      {
        userId: validUser.id,
        token: Helper.faker().string.alpha(255),
        expiredAt: Helper.faker().date.future(),
      },
    ],
  });
};

describe("deleteAll", () => {
  it("delete all tokens of valid user", async () => {
    const validUser = await Serene.user().getById(1);

    await seedFakeTokensOfUser(validUser);

    await Haven.AccessToken().setUser(validUser).deleteAll();

    const result = await Serene.user()
      .where({
        id: validUser.id,
      })
      .include({ accessTokens: true })
      .get();

    expect(result.accessTokens.length).toBe(0);
  });
});
