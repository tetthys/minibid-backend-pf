import Serene from "../../../../../../src/prisma/factory/Serene";
import testConfig from "../../utils/testConfig";

describe("exclude-with", () => {
  const excludeCount = 2;
  const withCount = 2;
  it("exclude with", async () => {
    const result: any = await Serene.product()
      .exclude({
        name: true,
        startingPrice: true,
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(
      testConfig.productColumnCount - excludeCount + withCount
    );
  });
});
