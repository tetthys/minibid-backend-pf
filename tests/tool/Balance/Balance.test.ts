import Balance from "../../../src/tool/Balance/Balance";

describe("Balance", () => {
  it("check", async () => {
    const data = {};
    const meta = {};
    const mustBeTrue = await new Balance().check(data, meta);
    expect(mustBeTrue).toBe(true);
  });
});
