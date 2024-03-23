// import Serene from "../../prisma/factory/Serene";
// import Haven from "../Haven/Haven";

/**
 * How to implement?
 *
 * ### TIPs
 *
 * 1. Choose a proper thrid party service.
 *
 * 2. Use meta when sending some data to te service.
 *
 * 3. If you need to store something for a while, use Haven.Cache() or directly use Haven.Redis()
 */

export default class PhoneNumberCode {
  private _to: string = "";

  public to(_to: string, meta?: Record<string, any>) {
    this._to = _to;
    return this;
  }

  public async send() {
    return {
      state: "sent",
      to: this._to,
      code: "123456",
    };
  }

  public async verify(code: string, to: string, meta?: Record<string, any>) {
    return true;
  }
}
