import Serene from "../../../../../../src/prisma/factory/Serene";
import testConfig from "../../utils/testConfig";

describe("include", () => {
  const includeCount = 2;
  it("include", async () => {
    const result: any = await Serene.product()
      .include({
        productImages: true,
        checkouts: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(
      testConfig.productColumnCount + includeCount
    );
  });
});
