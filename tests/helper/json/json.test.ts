import json from "../../../src/helper/json/json";

describe("json", () => {
  it("object prop in obj", async () => {
    const testObj = {
      a: {},
    };

    const jsonString = json(testObj);

    const parsed = JSON.parse(jsonString);

    expect(typeof parsed.a).toBe("object");
  });
  it("array prop in obj", async () => {
    const testObj = {
      a: [],
    };

    const jsonString = json(testObj);

    const parsed = JSON.parse(jsonString);

    const isArray = Array.isArray(parsed.a);

    expect(isArray).toBe(true);

    // https://stackoverflow.com/questions/12996871/why-does-typeof-array-with-objects-return-object-and-not-array
    // expect(typeof parsed.a).toBe("array");
  });
  it("bigint prop in obj to string", async () => {
    const testObj = {
      a: BigInt(1),
    };

    const jsonString = json(testObj);

    const parsed = JSON.parse(jsonString);

    expect(typeof parsed.a).toBe("string");
  });
  it("undefined prop in obj", async () => {
    const testObj = {
      a: undefined,
      b: "value",
    };

    const jsonString = json(testObj);

    const parsed = JSON.parse(jsonString);

    expect(parsed.a).toBeFalsy();
    expect(parsed.b).toBe("value");
  });
  it("null prop in obj", async () => {
    const testObj = {
      a: null,
      b: "value",
    };

    const jsonString = json(testObj);

    const parsed = JSON.parse(jsonString);

    expect(parsed.a).toBeFalsy();
    expect(parsed.b).toBe("value");
  });
});
