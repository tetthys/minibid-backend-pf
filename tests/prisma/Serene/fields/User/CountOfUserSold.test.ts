import CountOfUserSold from "../../../../../src/prisma/field/User/CountOfUserSold";

describe("CountOfUserSold", () => {
  it("return", async () => {
    const result = await new CountOfUserSold().get(1);
    expect(result.countOfUserSold).toBeTruthy();
  });
});
