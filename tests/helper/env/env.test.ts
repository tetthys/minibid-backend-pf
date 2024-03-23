import env from "../../../src/helper/env/env";

describe("env", () => {
  it("uppercase", async () => {
    const wsPort = env("WEBSOCKET_PORT");
    expect(wsPort).toBeTruthy();
    expect(typeof parseInt(wsPort)).toBe("number");
  });
  it("undercase", async () => {
    const wsPort = env("websocket_port");
    expect(wsPort).toBeTruthy();
    expect(typeof parseInt(wsPort)).toBe("number");
  });
});
