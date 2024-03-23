import Haven from "../../src/tool/Haven/Haven";
import WSC from "../../src/tool/WSC/WSC";

describe("haven", () => {
  it("work", async () => {
    const i = Haven.WSC();
    expect(i instanceof WSC).toBe(true);
  });
});
