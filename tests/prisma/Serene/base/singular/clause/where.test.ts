import { Prisma } from "@prisma/client";
import Serene from "../../../../../../src/prisma/factory/Serene";

describe("where", () => {
  const startingPriceToWhere = 112233.445566;
  const startingPriceToExpect = new Prisma.Decimal(112233.445566);
  it("where", async () => {
    const result: any = await Serene.product()
      .where({
        startingPrice: startingPriceToWhere,
      })
      .get();
    expect(result.startingPrice).toEqual(startingPriceToExpect);
  });
  it("where orderBy", async () => {
    const result: any = await Serene.product()
      .where({
        startingPrice: startingPriceToWhere,
      })
      .orderBy({
        createdAt: "desc",
      })
      .get();
    expect(result.startingPrice).toEqual(startingPriceToExpect);
  });
  it("where orderBy with", async () => {
    const result: any = await Serene.product()
      .where({
        startingPrice: startingPriceToWhere,
      })
      .orderBy({
        createdAt: "desc",
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get();
    expect(result.startingPrice).toEqual(startingPriceToExpect);
    expect(result.countOfUserBidding).toBeTruthy();
    expect(result.highestBiddingPrice).toBeTruthy();
  });
  it("where orderBy with include", async () => {
    const result: any = await Serene.product()
      .where({
        startingPrice: startingPriceToWhere,
      })
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
      })
      .get();
    expect(result.startingPrice).toEqual(startingPriceToExpect);
    expect(result.countOfUserBidding).toBeTruthy();
    expect(result.highestBiddingPrice).toBeTruthy();
    expect(result.productImages).toBeTruthy();
    expect(result.checkouts).toBeTruthy();
  });
});
