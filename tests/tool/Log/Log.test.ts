import Log from "../../../src/tool/Log/Log";

describe("Log", () => {
  it("emergency", async () => {
    new Log().emergency("message");
    expect(true).toBe(true);
  });
  it("alert", async () => {
    new Log().alert("message");
    expect(true).toBe(true);
  });
  it("critical", async () => {
    new Log().critical("message");
    expect(true).toBe(true);
  });
  it("error", async () => {
    new Log().error("message");
    expect(true).toBe(true);
  });
  it("warning", async () => {
    new Log().warning("message");
    expect(true).toBe(true);
  });
  it("notice", async () => {
    new Log().notice("message");
    expect(true).toBe(true);
  });
  it("info", async () => {
    new Log().info("message");
    expect(true).toBe(true);
  });
  it("debug", async () => {
    new Log().debug("message");
    expect(true).toBe(true);
  });
});
