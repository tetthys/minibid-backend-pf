import snakeToCamel from "../../../../src/helper/string/snakeToCamel/snakeToCamel";

describe("snakeToCamel", () => {
  it("product_images to productImages", async () => {
    expect(snakeToCamel("product_images")).toBe("productImages");
  });
});
