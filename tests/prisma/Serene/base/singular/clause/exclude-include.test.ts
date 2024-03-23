import Serene from "../../../../../../src/prisma/factory/Serene";
import testConfig from "../../utils/testConfig";

describe("exclude-include", () => {
  const excludeCount = 2;
  const includeCount = 3;
  it("exclude include", async () => {
    const result: any = await Serene.product()
      .exclude({
        createdAt: true,
        updatedAt: true,
      })
      .include({
        productImages: true,
        checkouts: true,
        user: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(
      testConfig.productColumnCount - excludeCount + includeCount
    );
  });
});
