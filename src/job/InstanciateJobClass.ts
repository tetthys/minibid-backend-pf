import CreateUserCheckout from "./jobs/CreateUserCheckout";
import FakeJob from "./jobs/fake/FakeJob";
import FakeJobThrowError from "./jobs/fake/FakeJobThrowError";
import WithdrawToSeller from "./jobs/WithdrawToSeller";

export default class InstanciateJobClass {
  public static instanciate(d: Record<string, any>): any {
    switch (d.className) {
      case "CreateUserCheckout":
        return new CreateUserCheckout(d.args.userId, d.args.productId);
      case "WithdrawToSeller":
        return new WithdrawToSeller(d.args.withdrawalId);
      // * Testing purpose
      case "FakeJob":
        return new FakeJob(d.args.id);
      // * Testing purpose
      case "FakeJobThrowError":
        return new FakeJobThrowError(d.args.id);
      default:
        throw new Error("Class not found");
    }
  }
}
