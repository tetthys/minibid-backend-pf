import Serene from "../../../../src/prisma/factory/Serene";

describe("CreditLevel", () => {
  it("return level", async () => {
    const result: any = await Serene.user()
      .where({
        id: 1,
      })
      .with({
        creditLevel: true,
      })
      .get();
    expect(result.creditLevel).toBe("good");
  });
});
