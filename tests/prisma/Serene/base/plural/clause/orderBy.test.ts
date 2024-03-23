import Serene from "../../../../../../src/prisma/factory/Serene";

describe("orderBy", () => {
  it("orderBy", async () => {
    const result: any = await Serene.products()
      .orderBy({
        createdAt: "desc",
      })
      .get(10);
    expect(result.length).toBe(10);

    let prev: any = undefined;
    result.map((each: any) => {
      if (prev) {
        let result = each.createdAt <= prev;
        expect(result).toBeTruthy();
      }
      prev = each.createdAt;
    });
  });
  it("orderBy with", async () => {
    const result: any = await Serene.products()
      .orderBy({
        createdAt: "desc",
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get(10);
    expect(result.length).toBe(10);

    let prev: any = undefined;
    result.map((each: any) => {
      if (prev) {
        let result = each.createdAt <= prev;
        expect(result).toBeTruthy();
      }
      prev = each.createdAt;
    });
  });
  it("orderBy with include", async () => {
    const result: any = await Serene.products()
      .orderBy({
        createdAt: "desc",
      })
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
    expect(result.length).toBe(10);

    let prev: any = undefined;
    result.map((each: any) => {
      if (prev) {
        let result = each.createdAt <= prev;
        expect(result).toBeTruthy();
      }
      prev = each.createdAt;
    });
  });
});
