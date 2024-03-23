import Serene from "../../../../../../src/prisma/factory/Serene";

describe("mix", () => {
  it("mix", async () => {
    const result: any = await Serene.products()
      .where({
        startingPrice: 112233.445566,
      })
      .include({
        productImages: true,
        bids: true,
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .mix()
      .get(100);
    expect(Number(result[0].id) === Number(result[1].id) - 1).toBeFalsy();
  });
});
