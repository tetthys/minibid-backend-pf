import Serene from "../../prisma/factory/Serene";
import Job from "../base/Job";

type Id = number | bigint;

export default class CreateUserCheckout extends Job {
  private userId: Id;
  private productId: Id;

  constructor(userId: Id, productId: Id) {
    super("CreateUserCheckout", { userId, productId });

    this.userId = userId;
    this.productId = productId;
  }

  public async handle() {
    console.log("called handle method from CreateUserCheckout");

    // pay with payment gateway

    // update state by result above
    await Serene.prisma().$transaction([
      Serene.prisma().checkout.update({
        where: {
          userId_productId: {
            userId: this.userId,
            productId: this.productId,
          },
        },
        data: {
          state: "completed",
        },
      }),
    ]);
  }
}
