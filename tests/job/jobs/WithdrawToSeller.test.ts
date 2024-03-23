import json from "../../../src/helper/json/json";
import WithdrawToSeller from "../../../src/job/jobs/WithdrawToSeller";
import Serene from "../../../src/prisma/factory/Serene";

describe("WithdrawToSeller", () => {
  let withdrawal: any;

  /**
   * * EndAuctionByTime creates withdrawal records with state "queue"
   */
  beforeEach(async () => {
    withdrawal = await Serene.prisma().withdrawal.create({
      data: {
        userId: 1,
        amount: 1000,
        state: "queue",
        product: json({
          id: 1,
          name: "product0",
        }),
      },
    });
  });

  /**
   * * withdrawalId is primary key of withdrawal table
   */
  it("accept withdrawalId and then update state to completed after handle method", async () => {
    await new WithdrawToSeller(withdrawal.id).handle();

    const updated = await Serene.prisma().withdrawal.findFirstOrThrow({
      where: {
        id: withdrawal.id,
      },
    });

    expect(updated.state).toBe("completed");
  });
});
