// import Serene from "../../prisma/factory/Serene";
// import Haven from "../Haven/Haven";
// import env from "../../helper/env/env";

/**
 * How to implement?
 *
 *
 *
 * After a user's checkout is completed through PaymentGateway, The amount will be deposited into the miniBid bank account.
 *
 * Just transfer the proper amount to seller's bank account.
 */

export default class BankCompany {
  async transfer(data: Record<string, any>, meta?: Record<string, any>) {
    return "success";
  }

  // * Anything commented out below is just an example for explanation in the end. Just for reference!

  //   private concreteBankCompanyService: any = new ConcreteBankCompanyService({
  //     api_key: env("CONCRETE_BANK_COMPANY_API_KEY"),
  //   });

  //   public async transfer(data: Record<string, any>, meta?: Record<string, any>) {
  //     try {
  //       const res = await this.concreteBankCompanyService.requestApproval(
  //         data,
  //         meta
  //       );

  //       switch (res.event.type) {
  //         case "service.success":
  //           return "success";
  //         case "service.failure":
  //           return "failure";
  //         default:
  //           return "error";
  //       }
  //     } catch (e) {
  //       // error handling
  //     }
  //   }
}
