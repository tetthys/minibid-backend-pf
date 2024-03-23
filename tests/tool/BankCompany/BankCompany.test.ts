import BankCompany from "../../../src/tool/BankCompany/BankCompany";

describe("BankCompany", () => {
  it("transfer", async () => {
    const data = {};
    const meta = {};
    const result = await new BankCompany().transfer(data, meta);
    expect(result).toBe("success");
  });
});
