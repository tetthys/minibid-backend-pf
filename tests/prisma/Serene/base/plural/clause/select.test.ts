import Serene from "../../../../../../src/prisma/factory/Serene";

describe("select", () => {
  const selectCount = 2;
  const withCount = 2;
  const includeCount = 3;
  it("select", async () => {
    const result: any = await Serene.products()
      .select({
        id: true,
        name: true,
      })
      .get(10);
    expect(Object.keys(result[0]).length).toBe(selectCount);
    expect(result[0].id).toBeTruthy();
    expect(result[0].name).toBeTruthy();
  });
  it("select where", async () => {
    const result: any = await Serene.products()
      .select({
        id: true,
        name: true,
      })
      .where({
        startingPrice: 112233.445566,
      })
      .get(10);
    expect(Object.keys(result[0]).length).toBe(selectCount);
    expect(result[0].id).toBeTruthy();
    expect(result[0].name).toBeTruthy();
  });
  it("select where orderBy", async () => {
    const result: any = await Serene.products()
      .select({
        id: true,
        name: true,
      })
      .where({
        startingPrice: 112233.445566,
      })
      .orderBy({
        createdAt: "desc",
      })
      .get(10);
    expect(Object.keys(result[0]).length).toBe(selectCount);
    expect(result[0].id).toBeTruthy();
    expect(result[0].name).toBeTruthy();
  });
  it("select where orderBy with", async () => {
    const result: any = await Serene.products()
      .select({
        id: true,
        name: true,
      })
      .where({
        startingPrice: 112233.445566,
      })
      .orderBy({
        createdAt: "desc",
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get(10);
    expect(Object.keys(result[0]).length).toBe(selectCount + withCount);
    expect(result[0].id).toBeTruthy();
    expect(result[0].name).toBeTruthy();
    expect(result[0].countOfUserBidding).toBeTruthy();
    expect(result[0].highestBiddingPrice).toBeTruthy();
  });
  it("select where orderBy with include", async () => {
    const result: any = await Serene.products()
      .select({
        id: true,
        name: true,
      })
      .where({
        startingPrice: 112233.445566,
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
    expect(Object.keys(result[0]).length).toBe(
      selectCount + withCount + includeCount
    );
    expect(result[0].id).toBeTruthy();
    expect(result[0].name).toBeTruthy();
    expect(result[0].countOfUserBidding).toBeTruthy();
    expect(result[0].highestBiddingPrice).toBeTruthy();
    expect(result[0].productImages).toBeTruthy();
    expect(result[0].checkouts).toBeTruthy();
    expect(result[0].bids).toBeTruthy();
  });
});
