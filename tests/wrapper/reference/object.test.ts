import { cloneDeep } from "lodash";

class TestObjectCopy {
  private objectProperty: any;

  constructor(objectProperty: any) {
    this.objectProperty = objectProperty;
  }

  public getObjectProperty() {
    return this.objectProperty;
  }
}

describe("object", () => {
  it("object is copied by reference", async () => {
    let originalObject: any = { a: "a", b: "b" };
    let copiedObject = originalObject;
    expect(originalObject).toBe(copiedObject);
  });
  it("object is copied by reference and add property to originalObject", async () => {
    let originalObject: any = { a: "a", b: "b" };
    let copiedObject = originalObject;
    originalObject.c = "c";
    expect(originalObject.c).toBe(copiedObject.c);
  });
  it("object is copied by reference and add property to copiedObject", async () => {
    let originalObject: any = { a: "a", b: "b" };
    let copiedObject = originalObject;
    copiedObject.c = "c";
    expect(originalObject.c).toBe(copiedObject.c);
  });
  it("object is copied by cloneDeep", async () => {
    let originalObject: any = { a: "a", b: "b" };
    let copiedObject = cloneDeep(originalObject);
    expect(originalObject).not.toBe(copiedObject);
  });
  it("object is copied by cloneDeep and add property to originalObject", async () => {
    let originalObject: any = { a: "a", b: "b" };
    let copiedObject = cloneDeep(originalObject);
    originalObject.c = "c";
    expect(originalObject.c).not.toBe(copiedObject.c);
  });
  it("object is copied by cloneDeep and add property to copiedObject", async () => {
    let originalObject: any = { a: "a", b: "b" };
    let copiedObject = cloneDeep(originalObject);
    copiedObject.c = "c";
    expect(originalObject.c).not.toBe(copiedObject.c);
  });
  it("check equality of copied object inside instance #1", async () => {
    let testObject: any = { a: "a", b: "b" };
    let testInstance = new TestObjectCopy(testObject);
    expect(testInstance.getObjectProperty()).toBe(testObject);
  });
  it("check equality of copied object inside instance after add property to testObject", async () => {
    let testObject: any = { a: "a", b: "b" };
    let testInstance = new TestObjectCopy(testObject);
    testObject.c = "c";
    expect(testInstance.getObjectProperty().c).toBe(testObject.c);
  });
  it("check equality of copied object inside instance after add property to copied object inside instance", async () => {
    let testObject: any = { a: "a", b: "b" };
    let testInstance = new TestObjectCopy(testObject);
    testInstance.getObjectProperty().c = "c";
    expect(testInstance.getObjectProperty().c).toBe(testObject.c);
  });
});
