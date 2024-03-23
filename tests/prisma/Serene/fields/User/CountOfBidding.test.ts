import CountOfBidding from "../../../../../src/prisma/field/User/CountOfBidding";

describe("CountOfBidding", () => {
  it("return", async () => {
    const result = await new CountOfBidding().get(1);
    expect(result.countOfBidding).toBeTruthy();
  });
});
