import Wrapper from "../base/Wrapper";

export default class BarWrapper extends Wrapper {
  protected async convertObject(originalObject: any): Promise<any> {
    return {
      ...originalObject,
      bar: true,
    };
  }
}
