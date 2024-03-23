import EndAuctionByTime from "../../../src/command/commands/EndAuctionByTime";
import Serene from "../../../src/prisma/factory/Serene";

const productClosedUserId = 1;
const bidUserId = 2;

describe("EndAuctionByTime", () => {
  let productClosed: any;
  let bidClosed: any;

  beforeEach(async () => {
    // delete all dependencies on database
    await Serene.prisma().job.deleteMany({});
    await Serene.prisma().checkout.deleteMany({
      where: {
        state: "queue",
        userId: bidUserId,
      },
    });
    await Serene.prisma().withdrawal.deleteMany({
      where: {
        state: "queue",
        userId: productClosedUserId,
      },
    });

    // create fake product closed
    productClosed = await Serene.prisma().product.create({
      data: {
        userId: productClosedUserId,
        name: "...",
        shortDescription: "...",
        description: "...",
        startingPrice: 10,
        endAt: new Date("2020-01-01"),
      },
    });

    // create fake bid on the product
    bidClosed = await Serene.prisma().bid.create({
      data: {
        userId: bidUserId,
        productId: productClosed.id,
        biddingPrice: 20,
      },
    });
  });

  afterEach(async () => {
    // delete all dependencies on database
    await Serene.prisma().job.deleteMany({});
    await Serene.prisma().checkout.deleteMany({
      where: {
        state: "queue",
        userId: bidUserId,
      },
    });
    await Serene.prisma().withdrawal.deleteMany({
      where: {
        state: "queue",
        userId: productClosedUserId,
      },
    });

    // delete fake bid on the product
    await Serene.prisma().bid.delete({
      where: {
        id: bidClosed.id,
      },
    });

    // delete fake product closed
    await Serene.prisma().product.delete({
      where: {
        id: productClosed.id,
      },
    });
  });

  it("add two jobs ( CreateUserCheckout + WithdrawToSeller ) on queue", async () => {
    await new EndAuctionByTime().execute();
    const mustBeTwo = await Serene.prisma().job.count();
    expect(mustBeTwo).toBe(2);
  });

  it("there must be checkout record with state 'queue'", async () => {
    await new EndAuctionByTime().execute();
    const mustBeOne = await Serene.prisma().checkout.count({
      where: {
        state: "queue",
        userId: bidUserId,
      },
    });
    expect(mustBeOne).toBe(1);
  });

  it("there must be withdrawal record with state 'queue'", async () => {
    await new EndAuctionByTime().execute();
    const mustBeOne = await Serene.prisma().withdrawal.count({
      where: {
        state: "queue",
        userId: productClosedUserId,
      },
    });
    expect(mustBeOne).toBe(1);
  });
});
