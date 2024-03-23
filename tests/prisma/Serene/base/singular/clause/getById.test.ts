import Serene from "../../../../../../src/prisma/factory/Serene";
import testConfig from "../../utils/testConfig";

describe("getById", () => {
  it("getById", async () => {
    const result: any = await Serene.product().getById(1);
    expect(result).toBeTruthy();
    expect(Object.keys(result).length).toBe(testConfig.productColumnCount);
  });
});
