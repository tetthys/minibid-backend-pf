import WebSocket from "ws";
import createWebSocketServer from "../../../src/websocket/createWebSocketServer";
import Serene from "../../../src/prisma/factory/Serene";
import waitForSocketState from "../utils/waitForSocketState";
import send from "../utils/send";
import executeWhen from "../utils/executeWhen";
import getRandomTestPort from "../utils/getRandomTestPort";
import bufferToObj from "../../../src/helper/buffer/bufferToObj/bufferToObj";
import json from "../../../src/helper/json/json";
import Haven from "../../../src/tool/Haven/Haven";

const WEBSOCKET_PORT: number = getRandomTestPort();
const CLOSE_AFTER = 0.1 * 1000;

describe("message", () => {
  let wss: WebSocket.Server;

  beforeAll(() => {
    wss = createWebSocketServer(WEBSOCKET_PORT);
  });

  afterAll(() => {
    wss.close();
  });

  it(
    "client connect and receive receiver's data",
    async () => {
      const senderId = 1;
      const receiverId = 2;

      const sender = await Serene.user().getById(senderId);
      const receiver = await Serene.user().getById(receiverId);
      const senderToken = await Haven.AccessToken().setUser(sender).create();

      const senderCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/message?senderId=${sender.id}&receiverId=${receiver.id}&access_token=${senderToken}`
      );

      let senderReceived = 0;

      let senderReceivedMessages: any;

      senderCli.onopen = () => {
        senderCli.on("message", (message: any) => {
          if (senderReceived === 0) {
            senderReceivedMessages = bufferToObj(message);
          }
          senderReceived++;
        });
      };

      // close asynchronously
      setTimeout(() => {
        senderCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(senderCli, senderCli.CLOSED);

      expect(senderReceivedMessages.type).toBe("server.send:receiver.data");
      expect(senderReceivedMessages.data.id).toBe(String(receiver.id));
    },
    CLOSE_AFTER * 10
  );

  it(
    "client connect and receive previous messages from server",
    async () => {
      const senderId = 1;
      const receiverId = 2;

      await Serene.prisma().message.createMany({
        data: [
          {
            senderId: senderId,
            receiverId: receiverId,
            data: "test",
          },
          {
            senderId: senderId,
            receiverId: receiverId,
            data: "test",
          },
          {
            senderId: receiverId,
            receiverId: senderId,
            data: "test",
          },
          {
            senderId: receiverId,
            receiverId: senderId,
            data: "test",
          },
          {
            senderId: senderId,
            receiverId: receiverId,
            data: "test",
          },
        ],
      });

      const sender = await Serene.user().getById(senderId);
      const receiver = await Serene.user().getById(receiverId);
      const senderToken = await Haven.AccessToken().setUser(sender).create();

      const senderCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/message?senderId=${sender.id}&receiverId=${receiver.id}&access_token=${senderToken}`
      );

      let senderReceived = 0;

      let senderReceivedMessages: any;

      senderCli.onopen = () => {
        senderCli.on("message", (message: any) => {
          if (senderReceived === 1) {
            senderReceivedMessages = bufferToObj(message);
          }
          senderReceived++;
        });
      };

      // close asynchronously
      setTimeout(() => {
        senderCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(senderCli, senderCli.CLOSED);

      expect(senderReceivedMessages.type).toBe("server.send:previous_messages");
      expect(senderReceivedMessages.data.length > 5).toBe(true);
    },
    CLOSE_AFTER * 10
  );

  it(
    "client send message, server echo to sender and broadcast to receiver",
    async () => {
      const senderId = 10;
      const receiverId = 20;
      const otherId = 30;

      const sender = await Serene.user().getById(senderId);
      const receiver = await Serene.user().getById(receiverId);
      const other = await Serene.user().getById(otherId);

      const senderToken = await Haven.AccessToken().setUser(sender).create();
      const receiverToken = await Haven.AccessToken()
        .setUser(receiver)
        .create();
      const otherToken = await Haven.AccessToken().setUser(other).create();

      const senderCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/message?senderId=${sender.id}&receiverId=${receiver.id}&access_token=${senderToken}`
      );

      const receiverCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/message?senderId=${receiver.id}&receiverId=${sender.id}&access_token=${receiverToken}`
      );

      const otherCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/message?senderId=${other.id}&receiverId=${sender.id}&access_token=${otherToken}`
      );

      let senderReceived = 0;
      let receiverReceived = 0;
      let otherReceived = 0;

      let senderReceivedMessage: any;
      let receiverReceivedMessage: any;

      senderCli.onopen = () => {
        senderCli.on("message", (message: any) => {
          if (senderReceived === 2) {
            senderReceivedMessage = bufferToObj(message);
          }
          senderReceived++;
        });
      };

      receiverCli.onopen = () => {
        receiverCli.on("message", (message: any) => {
          if (receiverReceived === 2) {
            receiverReceivedMessage = bufferToObj(message);
          }
          receiverReceived++;
        });
      };

      otherCli.onopen = () => {
        otherCli.on("message", (message: any) => {
          otherReceived++;
        });
      };

      executeWhen(senderCli, senderCli.OPEN, () => {
        send(
          senderCli,
          json({
            type: "client.send:new_message",
            data: {
              message: "Hello!",
            },
          })
        );
      });

      // close asynchronously
      setTimeout(() => {
        senderCli.close();
        receiverCli.close();
        otherCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(senderCli, senderCli.CLOSED);
      await waitForSocketState(receiverCli, receiverCli.CLOSED);
      await waitForSocketState(otherCli, otherCli.CLOSED);

      expect(senderReceived).toBe(3);
      expect(receiverReceived).toBe(3);
      expect(otherReceived).toBe(2);

      expect(senderReceivedMessage.type).toBe("server.echo:new_message");
      expect(senderReceivedMessage.data.data).toBe("Hello!");

      expect(receiverReceivedMessage.type).toBe("server.broadcast:new_message");
      expect(receiverReceivedMessage.data.data).toBe("Hello!");
    },
    CLOSE_AFTER * 10
  );
});
