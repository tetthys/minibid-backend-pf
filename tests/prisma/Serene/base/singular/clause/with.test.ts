import Serene from "../../../../../../src/prisma/factory/Serene";
import testConfig from "../../utils/testConfig";

describe("with", () => {
  const withCount = 2;
  const includeCount = 2;
  it("with", async () => {
    const result: any = await Serene.product()
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(
      testConfig.productColumnCount + withCount
    );
  });
  it("with include", async () => {
    const result: any = await Serene.product()
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .include({
        productImages: true,
        checkouts: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(
      testConfig.productColumnCount + withCount + includeCount
    );
  });
});
