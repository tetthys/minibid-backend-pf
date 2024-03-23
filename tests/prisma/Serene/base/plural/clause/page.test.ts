import Serene from "../../../../../../src/prisma/factory/Serene";

describe("page", () => {
  it("page", async () => {
    const result: any = await Serene.products().page(1).get(10);
    expect(result.data.length).toBe(10);
    expect(result.meta).toBeTruthy();
  });
});
