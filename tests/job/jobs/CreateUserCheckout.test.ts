import CreateUserCheckout from "../../../src/job/jobs/CreateUserCheckout";
import Serene from "../../../src/prisma/factory/Serene";

describe("CreateUserCheckout", () => {
  let checkout: any;

  /**
   * * EndAuctionByTime creates checkout records with state "queue"
   */
  beforeEach(async () => {
    const product = await Serene.prisma().product.create({
      data: {
        userId: 1,
        name: "test",
        shortDescription: "test",
        description: "test",
        startingPrice: 100,
        endAt: new Date("2025-01-01"),
      },
    });
    checkout = await Serene.prisma().checkout.create({
      data: {
        userId: 2,
        productId: product.id,
        state: "queue",
        price: 1000,
      },
    });
  });

  /**
   * * userId and productId are composite key of checkout table
   */
  it("accept userId and productId and then update state to completed after handle method", async () => {
    await new CreateUserCheckout(checkout.userId, checkout.productId).handle();

    const updated = await Serene.prisma().checkout.findFirstOrThrow({
      where: {
        userId: checkout.userId,
        productId: checkout.productId,
      },
    });

    expect(updated.state).toBe("completed");
  });
});
