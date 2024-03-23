import Decimal from "decimal.js";

describe("decimal", () => {
  it("0.1 + 0.2 = 0.3", async () => {
    expect(Decimal.add(0.1, 0.2).toNumber()).toBe(0.3);
  });
  it("0.1 * -0.2 = -0.02", async () => {
    expect(Decimal.mul(0.1, -0.2).toNumber()).toBe(-0.02);
  });
  it("1.123456789 to 1.123457", async () => {
    expect(new Decimal(1.123456789).toDP(6).toNumber()).toBe(1.123457);
  });
  it("0.3 * (0.1 + 0.2) = 0.09", async () => {
    expect(Decimal.mul(0.3, Decimal.add(0.1, 0.2)).toNumber()).toBe(0.09);
  });
  it("equality case #1", async () => {
    expect(new Decimal(0)).toEqual(new Decimal(0));
  });
  it("equality case #2", async () => {
    expect(new Decimal(0)).toEqual(new Decimal(0).toDP(6));
  });
  it("equality case #3", async () => {
    expect(new Decimal(0)).not.toEqual(new Decimal(0).toDP(6).toNumber());
  });
});
