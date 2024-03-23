import Beverage from "../Beverage";
import Espresso from "../concrete/coffee/Espresso";
import Mocha from "../concrete/condiment/Mocha";
import Whip from "../concrete/condiment/Whip";

describe("decorator", () => {
  it("work", async () => {
    const espresso: Beverage = new Espresso();
    expect(new Mocha(espresso).cost()).toBe(1.99 + 0.2);
    expect(new Mocha(new Mocha(espresso)).cost()).toBe(1.99 + 0.2 + 0.2);
    expect(new Whip(new Mocha(new Mocha(espresso))).cost()).toBe(1.99 + 0.2 + 0.2 + 0.1);
  });
});
