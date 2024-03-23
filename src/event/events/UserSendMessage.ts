import json from "../../helper/json/json";
import Serene from "../../prisma/factory/Serene";
import Haven from "../../tool/Haven/Haven";
import CustomEvent from "../base/CustomEvent";

export default class UserSendMessage extends CustomEvent {
  private sender: any;
  private receiver: any;

  private push_to_receiver: any;

  public from(sender: any) {
    this.sender = sender;
    return this;
  }

  public to(receiver: any) {
    this.receiver = receiver;
    return this;
  }

  public for() {
    return this;
  }

  public async occur() {
    await this.business();
    await this.notifyToDB();
    this.push();
  }

  public async business() {}

  public async notifyToDB() {
    this.push_to_receiver = await Serene.prisma().notification.create({
      data: {
        userId: this.receiver.id,
        data: json({
          type: "received_message",
          message: `@${this.sender.username} sent you a message!`,
          link: `/profile/${this.sender.username}`,
        }),
      },
    });
  }

  public async push() {
    const accessTokens = await Serene.prisma().accessToken.findMany({
      where: {
        userId: this.receiver.id,
        expiredAt: {
          gt: new Date(),
        },
      },
    });

    Haven.WSC()
      .pathname("/notification")
      .forAll((client) => {
        accessTokens.forEach((accessToken) => {
          if (accessToken.token === client.queryParams.access_token) {
            client.ws.send(
              json({
                type: "server.broadcast:new_notification",
                data: this.push_to_receiver,
              })
            );
          }
        });
      });
  }
}
