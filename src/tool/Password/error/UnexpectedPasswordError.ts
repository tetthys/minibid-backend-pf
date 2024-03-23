export default class UnexpectedPasswordError extends Error {
  public message: any;
  public field: any;
  public details: any;
  constructor(message: string, field: string, details: any) {
    super();
    this.message = message;
    this.field = field;
    this.details = details;
  }
  public get() {
    return [
      { message: this.message, field: this.field, details: this.details },
    ];
  }
}
