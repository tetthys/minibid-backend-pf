import Event from "../../../src/event/Event";
import UserSendMessage from "../../../src/event/events/UserSendMessage";
import Serene from "../../../src/prisma/factory/Serene";

describe("UserSendMessage", () => {
  it("sender send message, and receiver get notification", async () => {
    const sender = await Serene.user().where({ id: 1 }).get();
    const receiver = await Serene.user().where({ id: 2 }).get();

    const dbBeforeMessage: any = await Serene.notifications()
      .where({
        userId: receiver.id,
      })
      .orderBy({
        createdAt: "desc",
      })
      .get(10);

    Event.occur(new UserSendMessage().from(sender).to(receiver));

    const dbAfterMessage: any = await Serene.notifications()
      .where({
        userId: receiver.id,
      })
      .orderBy({
        createdAt: "desc",
      })
      .get(10);

    expect(dbBeforeMessage[0]).not.toBe(dbAfterMessage[0]);
  });
});
