/**
 * Why does this test exist???
 *
 * There are cases where unintended results occur when 'select' and 'with' are used together.
 */

import Serene from "../../../../../../src/prisma/factory/Serene";

describe.skip("select-with", () => {
  it("select name and with", async () => {
    const result: any = await Serene.products()
      .select({
        name: true,
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get(10);
    expect(result[0].name).toBeTruthy();
    expect(result[0].countOfUserBidding).toBeTruthy();
    expect(result[0].highestBiddingPrice).toBeTruthy();
  });
});
