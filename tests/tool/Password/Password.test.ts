import Haven from "../../../src/tool/Haven/Haven";
import Password from "../../../src/tool/Password/Password";
import UnexpectedPasswordError from "../../../src/tool/Password/error/UnexpectedPasswordError";

describe("Password", () => {
  it("return hash for string", async () => {
    const string = "12345678";
    const hash = await Haven.Password().hash(string);
    expect(hash).toBeTruthy();
  });
  it("compare for correct password", async () => {
    const correctPassword = "12345678";
    const hashForCorrectPassword = await Haven.Password().hash(correctPassword);

    const mustBeTrue = await Haven.Password().verify(
      correctPassword,
      hashForCorrectPassword
    );
    expect(mustBeTrue).toBe(true);
  });
  it("compare for wrong password", async () => {
    const correctPassword = "12345678";
    const hashForCorrectPassword = await Haven.Password().hash(correctPassword);

    const wrongPassword = "12345678!";
    const mustBeFalse = await Haven.Password().verify(
      wrongPassword,
      hashForCorrectPassword
    );
    expect(mustBeFalse).toBe(false);
  });
  it("crash test : hash throw UnexpectedPasswordError", async () => {
    const throwUnextectedPasswordError = new (class extends Password {
      public async hash(password: string): Promise<string> {
        throw new UnexpectedPasswordError(
          "Unexpected password error",
          "password",
          ""
        );
      }
    })();
    expect(async () => {
      await throwUnextectedPasswordError.hash("test");
    }).rejects.toThrow(UnexpectedPasswordError);
  });
  it("crash test : verify throw UnexpectedPasswordError", async () => {
    const throwUnextectedPasswordError = new (class extends Password {
      public async verify(password: string, hashed: string): Promise<boolean> {
        throw new UnexpectedPasswordError(
          "Unexpected password error",
          "password",
          ""
        );
      }
    })();
    expect(async () => {
      await throwUnextectedPasswordError.verify("test", "test");
    }).rejects.toThrow(UnexpectedPasswordError);
  });
});
