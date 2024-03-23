import WebSocket from "ws";
import createWebSocketServer from "../../../src/websocket/createWebSocketServer";
import Serene from "../../../src/prisma/factory/Serene";
import waitForSocketState from "../utils/waitForSocketState";
import bufferToObj from "../../../src/helper/buffer/bufferToObj/bufferToObj";
import executeWhen from "../utils/executeWhen";
import send from "../utils/send";
import json from "../../../src/helper/json/json";
import getRandomTestPort from "../utils/getRandomTestPort";
import Event from "../../../src/event/Event";
import UserSendMessage from "../../../src/event/events/UserSendMessage";
import Haven from "../../../src/tool/Haven/Haven";

const WEBSOCKET_PORT: number = getRandomTestPort();
const CLOSE_AFTER = 0.1 * 1000;

describe("notification", () => {
  let wss: WebSocket.Server;

  beforeAll(() => {
    wss = createWebSocketServer(WEBSOCKET_PORT);
  });

  afterAll(() => {
    wss.close();
  });

  it(
    "client connect and receive previous notifications",
    async () => {
      const userId = 1;
      const user = await Serene.user().getById(userId);
      const userToken = await Haven.AccessToken().setUser(user).create();
      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/notification?access_token=${userToken}`
      );

      let userReceived = 0;

      let userReceivedMessage: any;

      userCli.onopen = () => {
        userCli.on("message", (message) => {
          if (userReceived === 0) {
            userReceivedMessage = bufferToObj(message);
          }
          userReceived++;
        });
      };

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(userReceivedMessage.type).toBe(
        "server.send:previous_notifications"
      );
      expect(userReceivedMessage.data.length >= 0).toBe(true);
    },
    CLOSE_AFTER * 10
  );

  it(
    "get correct notifications",
    async () => {
      const userId = 88;

      const notificationData = {
        type: "test",
        data: "test",
        link: "test",
      };
      const lastNotificationData = {
        type: "this is last notification",
        data: "this is last notification",
        link: "this is last notification",
      };

      // seed notifications
      await Serene.prisma().notification.createMany({
        data: [
          {
            userId: userId,
            data: json(notificationData),
          },
          {
            userId: userId,
            data: json(notificationData),
          },
          {
            userId: userId,
            data: json(notificationData),
          },
          {
            userId: userId,
            data: json(notificationData),
          },
          {
            userId: userId,
            data: json(lastNotificationData),
          },
        ],
      });

      const user = await Serene.user().getById(userId);
      const userToken = await Haven.AccessToken().setUser(user).create();
      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/notification?access_token=${userToken}`
      );

      let userReceived = 0;

      let userReceivedMessage: any;

      userCli.onopen = () => {
        userCli.on("message", (message) => {
          if (userReceived === 0) {
            userReceivedMessage = bufferToObj(message);
          }
          userReceived++;
        });
      };

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(userReceivedMessage.type).toBe(
        "server.send:previous_notifications"
      );
    },
    CLOSE_AFTER * 10
  );

  it(
    "when token is invalid, server send a error message",
    async () => {
      const invalidToken = "invalid_token";
      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/notification?access_token=${invalidToken}`
      );

      let userReceived = 0;
      let receivedMessage: any;

      userCli.onopen = () => {
        userCli.on("message", (message) => {
          if (userReceived === 0) {
            receivedMessage = bufferToObj(message);
          }
          userReceived++;
        });
      };

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(receivedMessage.type).toBe("server.send:error");
      expect(receivedMessage.data[0].message).toBe("Token doesn't exist");
    },
    CLOSE_AFTER * 10
  );

  it(
    "client delete and server return correct message",
    async () => {
      const userId = 1;

      // seed a notification
      const notificationToDelete = await Serene.prisma().notification.create({
        data: {
          userId: userId,
          data: json({
            type: "test",
            data: "test",
          }),
        },
      });

      const user = await Serene.user().getById(userId);
      const userToken = await Haven.AccessToken().setUser(user).create();
      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/notification?access_token=${userToken}`
      );

      let userReceived = 0;
      let receivedMessage: any;

      userCli.onopen = () => {
        userCli.on("message", (message) => {
          if (userReceived === 1) {
            receivedMessage = bufferToObj(message);
          }
          userReceived++;
        });
      };

      executeWhen(userCli, userCli.OPEN, () => {
        send(
          userCli,
          json({
            type: "client.send:delete.notification",
            data: {
              id: notificationToDelete.id,
            },
          })
        );
      });

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(receivedMessage.type).toBe("server.send:delete.notification");
      expect(String(receivedMessage.data.deleted.id)).toBe(
        String(notificationToDelete.id)
      ); // BigInt
      expect(receivedMessage.data.message).toBe("sucessfully deleted");
    },
    CLOSE_AFTER * 10
  );

  it(
    "client delete all and server return correct message",
    async () => {
      const userId = 1;

      // seed three notifications
      const notificationsToDelete =
        await Serene.prisma().notification.createMany({
          data: [
            {
              userId: userId,
              data: json({
                type: "test",
                data: "test",
              }),
            },
            {
              userId: userId,
              data: json({
                type: "test",
                data: "test",
              }),
            },
            {
              userId: userId,
              data: json({
                type: "test",
                data: "test",
              }),
            },
          ],
        });

      const user = await Serene.user().getById(userId);
      const userToken = await Haven.AccessToken().setUser(user).create();
      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/notification?access_token=${userToken}`
      );

      let userReceived = 0;
      let receivedMessage: any;

      userCli.onopen = () => {
        userCli.on("message", (message) => {
          if (userReceived === 1) {
            receivedMessage = bufferToObj(message);
          }
          userReceived++;
        });
      };

      executeWhen(userCli, userCli.OPEN, () => {
        send(
          userCli,
          json({
            type: "client.send:delete.all_notifications",
            data: {},
          })
        );
      });

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(receivedMessage.type).toBe("server.send:delete.all_notifications");
      expect(receivedMessage.data.message).toBe("sucessfully deleted all notifications");
    },
    CLOSE_AFTER * 10
  );

  it(
    "UserSendMessage event occured, then receiver got notified",
    async () => {
      const sender = await Serene.user().getById(33);
      const receiver = await Serene.user().getById(66);

      const senderToken = await Haven.AccessToken().setUser(sender).create();
      const receiverToken = await Haven.AccessToken()
        .setUser(receiver)
        .create();

      const senderCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/notification?access_token=${senderToken}`
      );
      const receiverCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/notification?access_token=${receiverToken}`
      );

      let senderReceived = 0;
      let receiverReceived = 0;

      let receiverReceivedMessage: any;

      senderCli.onopen = () => {
        senderCli.on("message", (message) => {
          senderReceived++;
        });
      };

      receiverCli.onopen = () => {
        receiverCli.on("message", (message) => {
          if (receiverReceived === 1) {
            receiverReceivedMessage = bufferToObj(message);
          }
          receiverReceived++;
        });
      };

      setTimeout(() => {
        senderCli.close();
        receiverCli.close();
      }, CLOSE_AFTER * 5);

      executeWhen(receiverCli, receiverCli.OPEN, async () => {
        Event.occur(new UserSendMessage().from(sender).to(receiver));
      });

      await waitForSocketState(senderCli, senderCli.CLOSED);
      await waitForSocketState(receiverCli, receiverCli.CLOSED);

      expect(senderReceived).toBe(1);
      expect(receiverReceived).toBe(2);

      expect(receiverReceivedMessage.type).toBe(
        "server.broadcast:new_notification"
      );
      expect(receiverReceivedMessage.data).toBeDefined();
    },
    CLOSE_AFTER * 10
  );
});
