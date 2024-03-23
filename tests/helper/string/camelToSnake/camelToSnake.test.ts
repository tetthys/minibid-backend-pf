import camelToSnake from "../../../../src/helper/string/camelToSnake/camelToSnake";

describe("camelToSnake", () => {
  it("productImages to product_images", async () => {
    expect(camelToSnake("productImages")).toBe("product_images");
  });
});
