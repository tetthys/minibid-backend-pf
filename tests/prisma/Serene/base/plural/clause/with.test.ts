import Serene from "../../../../../../src/prisma/factory/Serene";

describe("with", () => {
  it("one chunk true", async () => {
    const result: any = await Serene.products()
      .with({ countOfUserBidding: true, highestBiddingPrice: true })
      .get(10);
    expect(result[0]).toBeTruthy();
    expect(result[0].countOfUserBidding).toBeTruthy();
    expect(result[0].highestBiddingPrice).toBeTruthy();
  });
  it("one chunk false", async () => {
    const result: any = await Serene.products()
      .with({ countOfUserBidding: false, highestBiddingPrice: false })
      .get(10);
    expect(result[0]).toBeTruthy();
    expect(result[0].countOfUserBidding).toBeFalsy();
    expect(result[0].highestBiddingPrice).toBeFalsy();
  });
  it("two chunks true", async () => {
    const result: any = await Serene.products()
      .with({ countOfUserBidding: true })
      .with({ highestBiddingPrice: true })
      .get(10);
    expect(result[0]).toBeTruthy();
    expect(result[0].countOfUserBidding).toBeTruthy();
    expect(result[0].highestBiddingPrice).toBeTruthy();
  });
  it("two chunks false", async () => {
    const result: any = await Serene.products()
      .with({ countOfUserBidding: false })
      .with({ highestBiddingPrice: false })
      .get(10);
    expect(result[0]).toBeTruthy();
    expect(result[0].countOfUserBidding).toBeFalsy();
    expect(result[0].highestBiddingPrice).toBeFalsy();
  });
  it("two chunks true, two chunks false", async () => {
    const result: any = await Serene.products()
      .with({ countOfUserBidding: true })
      .with({ highestBiddingPrice: true })
      .with({ countOfUserBidding: false })
      .with({ highestBiddingPrice: false })
      .get(10);
    expect(result[0]).toBeTruthy();
    expect(result[0].countOfUserBidding).toBeFalsy();
    expect(result[0].highestBiddingPrice).toBeFalsy();
  });
  it("with include", async () => {
    const result: any = await Serene.products()
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .include({
        productImages: true,
        checkouts: true,
        bids: true,
      })
      .get(10);
    expect(result[0].countOfUserBidding).toBeTruthy();
    expect(result[0].highestBiddingPrice).toBeTruthy();
    expect(result[0].productImages).toBeTruthy();
    expect(result[0].checkouts).toBeTruthy();
    expect(result[0].bids).toBeTruthy();
  });
});
