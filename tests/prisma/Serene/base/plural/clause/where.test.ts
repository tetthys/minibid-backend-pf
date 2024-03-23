import { Prisma } from "@prisma/client";
import Serene from "../../../../../../src/prisma/factory/Serene";

describe("where", () => {
  const startingPriceToWhere = 112233.445566;
  const startingPriceToExpect = new Prisma.Decimal(112233.445566);
  it("where", async () => {
    const result: any = await Serene.products()
      .where({
        startingPrice: startingPriceToWhere,
      })
      .get(10);
    expect(result.length).toBe(10);
    result.map((each: any) => {
      expect(each.startingPrice).toEqual(startingPriceToExpect);
    });
  });
  it("where orderBy", async () => {
    const result: any = await Serene.products()
      .where({
        startingPrice: startingPriceToWhere,
      })
      .orderBy({
        createdAt: "desc",
      })
      .get(10);
    expect(result.length).toBe(10);
    result.map((each: any) => {
      expect(each.startingPrice).toEqual(startingPriceToExpect);
    });
  });
  it("where orderBy with", async () => {
    const result: any = await Serene.products()
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
      .get(10);
    expect(result.length).toBe(10);
    result.map((each: any) => {
      expect(each.startingPrice).toEqual(startingPriceToExpect);
    });
  });
  it("where orderBy with include", async () => {
    const result: any = await Serene.products()
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
        bids: true,
      })
      .get(10);
    expect(result.length).toBe(10);
    result.map((each: any) => {
      expect(each.startingPrice).toEqual(startingPriceToExpect);
    });
  });
});
