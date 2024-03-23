export default class Result {
  private result: any;

  public constructor(result: any) {
    this.result = result;
  }

  public async applyTransformation(convertObject: Function): Promise<any> {
    if (this.isThisResultArray()) {
      return await Promise.all(
        this.result.map(async (item: any) => await convertObject(item))
      );
    }
    if (this.isThisResultPaginated()) {
      return {
        data: await Promise.all(
          this.result.data.map(async (item: any) => await convertObject(item))
        ),
        meta: this.result.meta,
      };
    }
    return await convertObject(this.result);
  }

  private isThisResultArray(): boolean {
    return Array.isArray(this.result);
  }

  private isThisResultPaginated(): boolean {
    return Array.isArray(this.result.data) && this.result.meta;
  }
}
