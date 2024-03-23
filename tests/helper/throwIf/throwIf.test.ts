import throwIf from "../../../src/helper/throwIf/throwIf";

describe("throwIf", () => {
  it("throw if true", async () => {
    expect(() => {
      throwIf(1 + 1 === 2, new Error("test"));
    }).toThrowError("test");
  });
  it("don't throw if false", async () => {
    expect(() => {
      throwIf(1 + 1 === 3, new Error("test"));
    }).not.toThrowError("test");
  });
});
