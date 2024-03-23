import EmailCode from "../../../src/tool/EmailCode/EmailCode";

describe("EmailCode", () => {
  it("send", async () => {
    const obj = await new EmailCode().to("test@test.com").send();

    expect(obj.state).toBe("sent");
    expect(obj.to).toBe("test@test.com");
    expect(obj.code).toBe("123456");
  });
  it("verify", async () => {
    const result = await new EmailCode().verify("123456", "test@test.com");
    expect(result).toBe(true);
  });
});
