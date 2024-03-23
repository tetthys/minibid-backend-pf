import json from "../../../src/helper/json/json";
import Serene from "../../../src/prisma/factory/Serene";
import createWebSocketServer from "../../../src/websocket/createWebSocketServer";
import Haven from "../../../src/tool/Haven/Haven";
import executeWhen from "../utils/executeWhen";
import getRandomTestPort from "../utils/getRandomTestPort";
import WebSocket from "ws";
import waitForSocketState from "../utils/waitForSocketState";
import bufferToObj from "../../../src/helper/buffer/bufferToObj/bufferToObj";

const WEBSOCKET_PORT: number = getRandomTestPort();
const CLOSE_AFTER = 0.1 * 1000;

describe("profile setting", () => {
  let wss: WebSocket.Server;

  beforeAll(() => {
    wss = createWebSocketServer(WEBSOCKET_PORT);
  });

  afterAll(() => {
    wss.close();
  });

  it(
    "client send email to change and then server send status",
    async () => {
      const userId = 10;
      const user = await Serene.user().getById(userId);
      const userToken = await Haven.AccessToken().setUser(user).create();

      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/profile_setting?email=true&access_token=${userToken}`
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
            type: "client.send:email_to_change",
            data: {
              email: "test@test.com",
            },
          })
        );
      });

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(userReceived).toBe(1);
      expect(userReceivedMessage.type).toBe(
        "server.send:waiting_for_email_verification_code"
      );
    },
    CLOSE_AFTER * 10
  );

  it(
    "client send email code then server send success",
    async () => {
      const userId = 10;
      const user = await Serene.user().getById(userId);
      const userToken = await Haven.AccessToken().setUser(user).create();

      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/profile_setting?email=true&access_token=${userToken}`
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
            type: "client.send:email_verification_code",
            data: {
              email: "test@test.com",
              code: "123456",
            },
          })
        );
      });

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(userReceived).toBe(1);
      expect(userReceivedMessage.type).toBe(
        "server.send:email_verification_success"
      );
    },
    CLOSE_AFTER * 10
  );

  it(
    "client send phonenumber to change and then server send status",
    async () => {
      const userId = 10;
      const user = await Serene.user().getById(userId);
      const userToken = await Haven.AccessToken().setUser(user).create();

      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/profile_setting?phonenumber=true&access_token=${userToken}`
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
            type: "client.send:phonenumber_to_change",
            data: {
              phonenumber: "111222333",
            },
          })
        );
      });

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(userReceived).toBe(1);
      expect(userReceivedMessage.type).toBe(
        "server.send:waiting_for_phonenumber_verification_code"
      );
    },
    CLOSE_AFTER * 10
  );

  it(
    "client send phonenumber code then server send success",
    async () => {
      const userId = 10;
      const user = await Serene.user().getById(userId);
      const userToken = await Haven.AccessToken().setUser(user).create();

      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/profile_setting?phonenumber=true&access_token=${userToken}`
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
            type: "client.send:phonenumber_verification_code",
            data: {
              phonenumber: "111222333",
              code: "123456",
            },
          })
        );
      });

      setTimeout(() => {
        userCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(userCli, userCli.CLOSED);

      expect(userReceived).toBe(1);
      expect(userReceivedMessage.type).toBe(
        "server.send:phonenumber_verification_success"
      );
    },
    CLOSE_AFTER * 10
  );
});
