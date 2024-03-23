import PaymentGateway from "../../../src/tool/PaymentGateway/PaymentGateway";

describe("PaymentGateway", () => {
  it("pay", async () => {
    const data = {};
    const meta = {};
    const result = await new PaymentGateway().pay(data, meta);
    expect(result).toBe("success");
  });
});