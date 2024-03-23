import Result from "../../../src/wrapper/base/Result";

describe("result", () => {
  const convertObject = (object: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...object, foo: true });
      }, 100);
    });
  };
  it("accept object array", async () => {
    let originalObjectArray = [{ a: "a" }, { b: "b" }, { c: "c" }];
    let resultInstance = new Result(originalObjectArray);
    expect(
      (await resultInstance.applyTransformation(convertObject))[0].foo
    ).toBeTruthy();
  });
  it("accpet raw single object", async () => {
    let originalObject = { a: "a" };
    let resultInstance = new Result(originalObject);
    expect(
      (await resultInstance.applyTransformation(convertObject)).foo
    ).toBeTruthy();
  });
});
