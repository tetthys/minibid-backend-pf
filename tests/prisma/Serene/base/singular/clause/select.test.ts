import Serene from "../../../../../../src/prisma/factory/Serene";

describe("select", () => {
  const selectCount = 2;
  const withCount = 2;
  const includeCount = 2;
  it("select", async () => {
    const result: any = await Serene.product()
      .select({
        id: true,
        name: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(selectCount);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
  });
  it("select where", async () => {
    const result: any = await Serene.product()
      .select({
        id: true,
        name: true,
      })
      .where({
        startingPrice: 112233.445566,
      })
      .get();
    expect(Object.keys(result).length).toBe(selectCount);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
  });
  it("select where orderBy", async () => {
    const result: any = await Serene.product()
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
      .get();
    expect(Object.keys(result).length).toBe(selectCount);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
  });
  it("select where orderBy with", async () => {
    const result: any = await Serene.product()
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
      .get();
    expect(Object.keys(result).length).toBe(selectCount + withCount);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.countOfUserBidding).toBeTruthy();
    expect(result.highestBiddingPrice).toBeTruthy();
  });
  it("select where orderBy with include", async () => {
    const result: any = await Serene.product()
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
      })
      .get();
    expect(Object.keys(result).length).toBe(
      selectCount + withCount + includeCount
    );
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.productImages).toBeTruthy();
    expect(result.checkouts).toBeTruthy();
    expect(result.countOfUserBidding).toBeTruthy();
    expect(result.checkouts).toBeTruthy();
  });
});
