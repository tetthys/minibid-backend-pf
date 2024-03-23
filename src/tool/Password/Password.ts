import bcrypt from "bcrypt";
import Haven from "../Haven/Haven";
import UnexpectedPasswordError from "./error/UnexpectedPasswordError";

export default class Password {
  private saltRounds = 10;

  public async hash(password: string): Promise<string> {
    const hashed: string = await bcrypt
      .genSalt(this.saltRounds)
      .then((salt: string) => bcrypt.hash(password, salt))
      .then((hash: string) => hash)
      .catch((e: Error) => {
        Haven.Log().error(e);
        throw new UnexpectedPasswordError(
          "Unexpected password error",
          "password",
          ""
        );
      });
    return hashed;
  }

  public async verify(password: string, hashed: string): Promise<boolean> {
    const isSame: boolean = await bcrypt
      .compare(password, hashed)
      .then((res: boolean) => res)
      .catch((e: Error) => {
        Haven.Log().error(e);
        throw new UnexpectedPasswordError(
          "Unexpected password error",
          "password",
          ""
        );
      });
    return isSame;
  }
}
