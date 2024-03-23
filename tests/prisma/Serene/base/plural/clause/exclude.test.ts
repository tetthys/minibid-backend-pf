import Serene from "../../../../../../src/prisma/factory/Serene";
import testConfig from "../../utils/testConfig";

describe("exclude", () => {
  const withCount = 2;
  const excludeCount = 2;
  it("exclude", async () => {
    const result: any = await Serene.products()
      .where({
        startingPrice: 112233.445566,
      })
      .exclude({
        createdAt: true,
        updatedAt: true,
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get(10);
    expect(Object.keys(result[0]).length).toBe(
      testConfig.productColumnCount - excludeCount + withCount
    );
    expect(result[3].createdAt).toBeFalsy();
    expect(result[3].updatedAt).toBeFalsy();
  });
});
