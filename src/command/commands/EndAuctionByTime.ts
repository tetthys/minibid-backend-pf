import json from "../../helper/json/json";
import CreateUserCheckout from "../../job/jobs/CreateUserCheckout";
import WithdrawToSeller from "../../job/jobs/WithdrawToSeller";
import Serene from "../../prisma/factory/Serene";
import Haven from "../../tool/Haven/Haven";
import Command from "../base/Command";

export default class EndAuctionByTime implements Command {
  public async execute() {
    const closedProducts = await Serene.prisma().product.findMany({
      where: {
        endAt: {
          lte: new Date(),
        },
        isEnded: false,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    for (const product of closedProducts) {
      await Serene.prisma().product.update({
        where: {
          id: product.id,
        },
        data: {
          isEnded: true,
        },
      });
      //
      //
      const highestBid = await Serene.prisma().bid.findFirst({
        where: {
          productId: product.id,
        },
        orderBy: {
          biddingPrice: "desc",
        },
      });
      //
      //
      if (highestBid) {
        await Serene.prisma().checkout.create({
          data: {
            userId: highestBid.userId,
            productId: product.id,
            state: "queue",
            price: highestBid.biddingPrice,
          },
        });
        await Haven.Queue().enqueue(
          new CreateUserCheckout(highestBid.userId, product.id)
        );
        //
        //
        const withdrawal = await Serene.prisma().withdrawal.create({
          data: {
            userId: product.user.id,
            state: "queue",
            amount: highestBid.biddingPrice,
            product: json({
              id: product.id,
              name: product.name,
            }),
          },
        });
        await Haven.Queue().enqueue(new WithdrawToSeller(withdrawal.id));
      }
      //
      //
    }
  }
}
