import Serene from "../../../../../../src/prisma/factory/Serene";

describe("get", () => {
  it("get() return all", async () => {
    const countOfAllProducts = await Serene.prisma().product.count();
    const products: any = await Serene.products().get();
    expect(products.length).toBe(countOfAllProducts);
  });
  it("get(5) return five items", async () => {
    const products: any = await Serene.products().get(5);
    expect(products.length).toBe(5);
  });
});
