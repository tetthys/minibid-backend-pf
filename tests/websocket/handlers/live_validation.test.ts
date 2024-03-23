import getRandomTestPort from "../utils/getRandomTestPort";
import createWebSocketServer from "../../../src/websocket/createWebSocketServer";
import WebSocket from "ws";
import bufferToObj from "../../../src/helper/buffer/bufferToObj/bufferToObj";
import waitForSocketState from "../utils/waitForSocketState";
import executeWhen from "../utils/executeWhen";
import json from "../../../src/helper/json/json";

const WEBSOCKET_PORT: number = getRandomTestPort();
const CLOSE_AFTER = 0.1 * 1000;

describe("live validation", () => {
  let wss: WebSocket.Server;

  beforeAll(() => {
    wss = createWebSocketServer(WEBSOCKET_PORT);
  });

  afterAll(() => {
    wss.close();
  });

  it(
    "realtime validation with createNewProduct",
    async () => {
      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/live_validation?middleware=createNewProduct`
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

      executeWhen(userCli, userCli.OPEN, () => {
        userCli.send(
          json({
            type: "client.send:data",
            data: {
              name: "name",
              startingPrice: 1234.1234,
            },
          })
        );
      });

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(userReceivedMessage.type).toBe("server.send:validation.error");
    },
    CLOSE_AFTER * 10
  );

  it(
    "realtime validation with authRegister",
    async () => {
      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/live_validation?middleware=authRegister`
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

      executeWhen(userCli, userCli.OPEN, () => {
        userCli.send(
          json({
            type: "client.send:data",
            data: {
              email: "email",
            },
          })
        );
      });

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(userReceivedMessage.type).toBe("server.send:validation.error");
    },
    CLOSE_AFTER * 10
  );
});
