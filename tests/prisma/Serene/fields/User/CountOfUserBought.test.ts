import CountOfUserBought from "../../../../../src/prisma/field/User/CountOfUserBought";

describe("CountOfUserBought", () => {
  it("return", async () => {
    const result = await new CountOfUserBought().get(1);
    expect(result.countOfUserBought).toBeTruthy();
  });
});
