import SumOfUserSold from "../../../../../src/prisma/field/User/SumOfUserSold";

describe("SumOfUserSold", () => {
  it("return", async () => {
    const result = await new SumOfUserSold().get(1);
    expect(result.sumOfUserSold).toBeTruthy();
  });
});
