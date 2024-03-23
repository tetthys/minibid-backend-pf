import Serene from "../../prisma/factory/Serene";
import Job from "../base/Job";

type Id = number | bigint;

export default class WithdrawToSeller extends Job {
  private withdrawalId: Id;

  constructor(withdrawalId: Id) {
    super("WithdrawToSeller", { withdrawalId });

    this.withdrawalId = withdrawalId;
  }

  public async handle() {
    console.log("called handle method from WithdrawToSeller");

    await Serene.prisma().$transaction([
      Serene.prisma().withdrawal.update({
        where: {
          id: this.withdrawalId,
        },
        data: {
          state: "completed",
        },
      }),
    ]);
  }
}
