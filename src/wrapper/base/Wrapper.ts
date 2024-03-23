import Result from "./Result";

export default abstract class Wrapper {
  protected result: any;
  protected request: any;
  protected wrapper?: Wrapper;

  constructor(wrapper?: Wrapper) {
    this.wrapper = wrapper;
    this.convertObject = this.convertObject.bind(this);
  }

  public setResult(result: any) {
    this.result = result;
    return this;
  }

  public setRequest(request: any) {
    this.request = request;
    return this;
  }

  public async get(): Promise<any> {
    if (this.wrapper) {
      let wrapperResult = await this.wrapper.setResult(this.result).get();
      return await new Result(wrapperResult).applyTransformation(
        this.convertObject
      );
    }
    return await new Result(this.result).applyTransformation(
      this.convertObject
    );
  }

  protected abstract convertObject(originalObject: any): Promise<any>;
}
