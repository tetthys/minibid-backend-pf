import HighestBiddingPrice from "../../../../../src/prisma/field/Product/HighestBiddingPrice";

describe("HighestBiddingPrice", () => {
  it("return", async () => {
    const result = await new HighestBiddingPrice().get(1);
    expect(result.highestBiddingPrice).toBeTruthy();
  });
});
