import throwUnless from "../../../src/helper/throwUnless/throwUnless";

describe("throwUnless", () => {
  it("throw if false", async () => {
    expect(() => {
      throwUnless(1 + 1 === 3, new Error("test"));
    }).toThrowError("test");
  });
  it("don't throw if true", async () => {
    expect(() => {
      throwUnless(1 + 1 === 2, new Error("test"));
    }).not.toThrowError("test");
  });
});
