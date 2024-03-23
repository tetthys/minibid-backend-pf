import Serene from "../../../../../../src/prisma/factory/Serene";
import testConfig from "../../utils/testConfig";

describe("exclude", () => {
  const excludeCount = 2;
  it("exclude", async () => {
    const result: any = await Serene.product()
      .exclude({
        createdAt: true,
        updatedAt: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(
      testConfig.productColumnCount - excludeCount
    );
  });
});
