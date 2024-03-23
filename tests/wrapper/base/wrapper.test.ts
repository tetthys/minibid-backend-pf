import BarWrapper from "../../../src/wrapper/stub/BarWrapper";
import FooWrapper from "../../../src/wrapper/stub/FooWrapper";

describe("wrapper", () => {
  it("FooWrapper add foo", async () => {
    let originalObject: any = { a: "a", b: "b", c: "c" };
    let resultObject = await new FooWrapper().setResult(originalObject).get();
    expect(resultObject.foo).toBeTruthy();
  });
  it("BarWrapper add bar", async () => {
    let originalObject: any = { a: "a", b: "b", c: "c" };
    let resultObject = await new BarWrapper().setResult(originalObject).get();
    expect(resultObject.bar).toBeTruthy();
  });
  it("FooWrapper + BarWrapper return object have foo, bar", async () => {
    let originalObject: any = { a: "a", b: "b", c: "c" };
    let resultObject = await new FooWrapper(new BarWrapper())
      .setResult(originalObject)
      .get();
    expect(resultObject.foo).toBeTruthy();
    expect(resultObject.bar).toBeTruthy();
  });
  it("BarWrapper + FooWrapper return object have bar, foo", async () => {
    let originalObject: any = { a: "a", b: "b", c: "c" };
    let resultObject = await new BarWrapper(new FooWrapper())
      .setResult(originalObject)
      .get();
    expect(resultObject.bar).toBeTruthy();
    expect(resultObject.foo).toBeTruthy();
  });
  it("FooWrapper + BarWrapper return object element have foo, bar", async () => {
    let originalObjectArray: any = [
      { a: "a", b: "b", c: "c" },
      { a: "a", b: "b", c: "c" },
      { a: "a", b: "b", c: "c" },
    ];
    let resultObjectArray = await new FooWrapper(new BarWrapper())
      .setResult(originalObjectArray)
      .get();
    expect(resultObjectArray[0].foo).toBeTruthy();
    expect(resultObjectArray[0].bar).toBeTruthy();
  });
  it("BarWrapper + FooWrapper return object element have foo, bar", async () => {
    let originalObjectArray: any = [
      { a: "a", b: "b", c: "c" },
      { a: "a", b: "b", c: "c" },
      { a: "a", b: "b", c: "c" },
    ];
    let resultObjectArray = await new BarWrapper(new FooWrapper())
      .setResult(originalObjectArray)
      .get();
    expect(resultObjectArray[0].foo).toBeTruthy();
    expect(resultObjectArray[0].bar).toBeTruthy();
  });
});
