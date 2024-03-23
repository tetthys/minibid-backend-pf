import Wrapper from "../base/Wrapper";

export default class FooWrapper extends Wrapper {
  protected async convertObject(originalObject: any): Promise<any> {
    return {
      ...originalObject,
      foo: true,
    };
  }
}
