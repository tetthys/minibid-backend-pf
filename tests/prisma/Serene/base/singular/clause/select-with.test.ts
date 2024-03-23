import Serene from "../../../../../../src/prisma/factory/Serene";

describe("select-with", () => {
  const selectCount = 3;
  const withCount = 2;
  it("select + with", async () => {
    const result: any = await Serene.product()
      .select({
        id: true,
        name: true,
        startingPrice: true,
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(selectCount + withCount);
  });
});
