import Serene from "../../../src/prisma/factory/Serene";
import getRandomTestPort from "../utils/getRandomTestPort";
import createWebSocketServer from "../../../src/websocket/createWebSocketServer";
import WebSocket from "ws";
import bufferToObj from "../../../src/helper/buffer/bufferToObj/bufferToObj";
import waitForSocketState from "../utils/waitForSocketState";

const WEBSOCKET_PORT: number = getRandomTestPort();
const CLOSE_AFTER = 0.1 * 1000;

describe("data_interface", () => {
  let wss: WebSocket.Server;

  beforeAll(() => {
    wss = createWebSocketServer(WEBSOCKET_PORT);
  });

  afterAll(() => {
    wss.close();
  });

  it(
    "anyone can recieve all categories",
    async () => {
      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/data_interface?categories=true`
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

      expect(userReceivedMessage.type).toBe("server.send:categories");

      const countOfCategories = await Serene.prisma().category.count();
      expect(userReceivedMessage.data.length).toBe(countOfCategories);
      expect(userReceivedMessage.data[0].id).toBeTruthy();
      expect(userReceivedMessage.data[0].name).toBeTruthy();
      expect(userReceivedMessage.data[0].createdAt).toBeFalsy();
      expect(userReceivedMessage.data[0].updatedAt).toBeFalsy();
    },
    CLOSE_AFTER * 10
  );

  it(
    "anyone can recieve all supported currencies",
    async () => {
      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/data_interface?currencies=true`
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

      expect(userReceivedMessage.type).toBe("server.send:currencies");

      expect(userReceivedMessage.data.length).toBe(33);
    },
    CLOSE_AFTER * 10
  );
});
