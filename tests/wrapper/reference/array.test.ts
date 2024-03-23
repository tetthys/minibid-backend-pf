import { cloneDeep } from "lodash";

class TestArrayCopy {
  private arrayProperty: Array<any>;

  constructor(arrayProperty: Array<any>) {
    this.arrayProperty = arrayProperty;
  }

  public getArrayProperty() {
    return this.arrayProperty;
  }
}

describe("array", () => {
  it("array is copied by referece", async () => {
    let originalArray = [1, 2, 3];
    let copiedArray = originalArray;
    expect(originalArray).toBe(copiedArray);
  });
  it("array is copied by referece and push originalArray", async () => {
    let originalArray = [1, 2, 3];
    let copiedArray = originalArray;
    originalArray.push(4);
    expect(originalArray[3]).toBe(copiedArray[3]);
  });
  it("array is copied by referece and push copiedArray", async () => {
    let originalArray = [1, 2, 3];
    let copiedArray = originalArray;
    copiedArray.push(4);
    expect(originalArray[3]).toBe(copiedArray[3]);
  });
  it("array is copied by cloneDeep", async () => {
    let originalArray = [1, 2, 3];
    let copiedArray = cloneDeep(originalArray);
    expect(originalArray).not.toBe(copiedArray);
  });
  it("array is copied by cloneDeep and push originalArray", async () => {
    let originalArray = [1, 2, 3];
    let copiedArray = cloneDeep(originalArray);
    originalArray.push(4);
    expect(originalArray[3]).not.toBe(copiedArray[3]);
  });
  it("array is copied by cloneDeep and push copiedArray", async () => {
    let originalArray = [1, 2, 3];
    let copiedArray = cloneDeep(originalArray);
    copiedArray.push(4);
    expect(originalArray[3]).not.toBe(copiedArray[3]);
  });
  it("check equality of copied array inside instance #1", async () => {
    let testArray = [1, 2, 3];
    let testInstance = new TestArrayCopy(testArray);
    expect(testInstance.getArrayProperty()).toBe(testArray);
  });
  it("check equality of copied array inside instance after push element into testArray", async () => {
    let testArray = [1, 2, 3];
    let testInstance = new TestArrayCopy(testArray);
    testArray.push(4);
    expect(testInstance.getArrayProperty()[3]).toBe(testArray[3]);
  });
  it("check equality of copied array inside instance after push element into copied array inside instance", async () => {
    let testArray = [1, 2, 3];
    let testInstance = new TestArrayCopy(testArray);
    testInstance.getArrayProperty().push(4);
    expect(testInstance.getArrayProperty()[3]).toBe(testArray[3]);
  });
});
