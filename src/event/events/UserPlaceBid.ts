import json from "../../helper/json/json";
import Serene from "../../prisma/factory/Serene";
import Haven from "../../tool/Haven/Haven";
import ConvertToUserCurrency from "../../wrapper/wrappers/ConvertToUserCurrency";
import CustomEvent from "../base/CustomEvent";

export default class UserPlaceBid extends CustomEvent {
  private user: any;
  private product: any;
  private biddingPrice: any;

  private push_to_seller: any;

  public from(user: any) {
    this.user = user;
    return this;
  }

  public to(product: any) {
    this.product = product;
    return this;
  }

  public for(biddingPrice: any) {
    this.biddingPrice = biddingPrice;
    return this;
  }

  public async occur() {
    await this.business();
    await this.notifyToDB();
    this.push();
  }

  public async business() {
    await Serene.prisma().bid.create({
      data: {
        userId: this.user.id,
        productId: this.product.id,
        biddingPrice: await Haven.Currency()
          .from(this.user.currency)
          .amount(this.biddingPrice)
          .toBaseCurrency()
          .convert(),
      },
    });
  }

  public async notifyToDB() {
    this.push_to_seller = await Serene.prisma().notification.create({
      data: {
        userId: this.product.userId,
        data: json({
          type: `user_placed_bid`,
          message: `@${this.user.username} have placed a bid!`,
          link: `/auction/${this.product.id}`,
        }),
      },
    });
  }

  public async push() {
    // find seller's accessToken
    const sellerTokens = await Serene.prisma().accessToken.findMany({
      where: {
        userId: this.product.userId,
      },
    });

    Haven.WSC()
      .pathname("/notification")
      .forAll((client) => {
        sellerTokens.forEach((sellerToken) => {
          if (sellerToken.token === client.queryParams.access_token) {
            client.ws.send(
              json({
                type: "server.broadcast:new_notification",
                data: this.push_to_seller,
              })
            );
          }
        });
      });

    const productUpdated = await Serene.product()
      .where({
        id: this.product.id,
      })
      .select({
        id: true,
        startingPrice: true,
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get();

    Haven.WSC()
      .pathname("/product")
      .forAll(async (client) => {
        const w = await new ConvertToUserCurrency()
          .setRequest({
            headers: {
              authorization: client.queryParams.access_token,
            },
          })
          .setResult(productUpdated)
          .get();
        if (BigInt(client.queryParams.productId) === this.product.id) {
          client.ws.send(
            json({
              type: "server.broadcast:updated_product",
              data: w,
            })
          );
        }
      });
  }
}
