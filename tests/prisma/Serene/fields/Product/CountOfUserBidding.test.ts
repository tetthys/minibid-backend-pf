import CountOfUserBidding from "../../../../../src/prisma/field/Product/CountOfUserBidding";

describe("CountOfUserBidding", () => {
  it("return", async () => {
    const result = await new CountOfUserBidding().get(1);
    expect(result.countOfUserBidding).toBeTruthy();
  });
});
