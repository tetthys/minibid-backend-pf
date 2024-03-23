// import Serene from "../../prisma/factory/Serene";
// import Haven from "../Haven/Haven";

// import PayPal from "./concrete/PayPal/PayPal";
// import Stripe from "./concrete/Stripe/Stripe";
// import Toss from "./concrete/Toss/Toss";

/**
 * How to implement?
 *
 *
 *
 * There are countless PG companies...
 *
 * Stripe, PayPal, Toss, etc...
 *
 * They all have different protocols.
 *
 *
 *
 * But in general,
 *
 * 1. This business logic needs to send one thing to that service endpoint.
 *
 * 2. Then wait for the response from their webhook or others.
 *
 * 3. The response tends to be string indicate the result of the processing.
 *
 *
 *
 * ### TIPs
 *
 * - If you need to store something for a while, use Haven.Cache() or directly use Haven.Redis(). This can be very useful for storing some session.
 *
 * - In some cases, it may not be necessary to send information about cards registered by users in this database to that service endpoint.
 */

export default class PaymentGateway {
  async pay(data: Record<string, any>, meta?: Record<string, any>) {
    return "success";
  }

  // * Anything commented out below is just an example for explanation in the end. Just for reference!

  // private concretePaymentGatewayService: any = new ConcretePaymentGatewayService({
  //   api_key: env('CONCRETE_PAYMENT_GATEWAY_API_KEY'),
  // })

  // async pay(data: Record<string, any>, meta?: Record<string, any>) {
  //   try {
  //     const res = await this.concretePaymentGatewayService.requestApproval(
  //       data,
  //       meta
  //     );

  //     switch (res.event.type) {
  //       case "service.success":
  //         return "success";
  //       case "service.failure":
  //         return "failure";
  //       default:
  //         return "error";
  //     }
  //   } catch (e) {
  //     if (e instanceof ConcretePaymentGatewayServiceError) {
  //       switch (e.code) {
  //         case "1000":
  //           Haven.Log().error({
  //             context: "connection",
  //             error: e,
  //           });
  //           break;
  //         case "2000":
  //           Haven.Log().error({
  //             context: "service",
  //             error: e,
  //           });
  //           break;
  //         default:
  //           Haven.Log().critical({
  //             context: "unknown",
  //             error: e,
  //           });
  //           break;
  //       }
  //       return "error";
  //     } else {
  //       Haven.Log().critical({
  //         context: "internal server error",
  //         error: e,
  //       });
  //       return "error";
  //     }
  //   }
  // }
}
