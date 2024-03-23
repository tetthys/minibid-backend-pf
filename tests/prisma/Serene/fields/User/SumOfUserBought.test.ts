import SumOfUserBought from "../../../../../src/prisma/field/User/SumOfUserBought";

describe("SumOfUserBought", () => {
  it("return", async () => {
    const result = await new SumOfUserBought().get(1);
    expect(result.sumOfUserBought).toBeTruthy();
  });
});
