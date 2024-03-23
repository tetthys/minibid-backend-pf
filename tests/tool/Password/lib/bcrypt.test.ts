import bcrypt from "bcrypt";

describe("bcrypt", () => {
  it("hash originalString", async () => {
    const saltRounds = 10;
    const originalString = "Admin@123";

    const result = await bcrypt
      .genSalt(saltRounds)
      .then((salt: string) => bcrypt.hash(originalString, salt))
      .then((hash: string) => hash)
      .catch((err: Error) => console.error(err));

    expect(result).not.toBe(originalString);
  });
  it("check hashed is from original string", async () => {
    const saltRounds = 10;
    const originalString = "Admin@123";

    const hashed = await bcrypt
      .genSalt(saltRounds)
      .then((salt: string) => bcrypt.hash(originalString, salt))
      .then((hash: string) => hash)
      .catch((err: Error) => console.error(err));

    const mustBeTrue = await bcrypt
      .compare(originalString, hashed as string)
      .then((res: boolean) => res)
      .catch((err: Error) => console.error(err));

    expect(mustBeTrue).toBe(true);
  });
});
