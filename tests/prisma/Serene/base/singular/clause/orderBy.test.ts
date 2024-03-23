import Serene from "../../../../../../src/prisma/factory/Serene";
import testConfig from "../../utils/testConfig";

describe("orderBy", () => {
  const withCount = 2;
  const includeCount = 2;
  it("orderBy", async () => {
    const result: any = await Serene.product()
      .orderBy({
        createdAt: "desc",
      })
      .get();
    expect(Object.keys(result).length).toBe(testConfig.productColumnCount);
  });
  it("orderBy with", async () => {
    const result: any = await Serene.product()
      .orderBy({
        createdAt: "desc",
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(
      testConfig.productColumnCount + withCount
    );
  });
  it("orderBy with include", async () => {
    const result: any = await Serene.product()
      .orderBy({
        createdAt: "desc",
      })
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
