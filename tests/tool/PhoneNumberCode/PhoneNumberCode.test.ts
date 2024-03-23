import PhoneNumberCode from "../../../src/tool/PhoneNumberCode/PhoneNumberCode";

describe("PhoneNumberCode", () => {
  it("send", async () => {
    const obj = await new PhoneNumberCode().to("1234567890").send();

    expect(obj.state).toBe("sent");
    expect(obj.to).toBe("1234567890");
    expect(obj.code).toBe("123456");
  });
  it("verify", async () => {
    const result = await new PhoneNumberCode().verify("123456", "1234567890");
    expect(result).toBe(true);
  });
});
