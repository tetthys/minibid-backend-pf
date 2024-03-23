import bufferToObj from "../../../src/helper/buffer/bufferToObj/bufferToObj";
import Serene from "../../../src/prisma/factory/Serene";
import createWebSocketServer from "../../../src/websocket/createWebSocketServer";
import getRandomTestPort from "../utils/getRandomTestPort";
import WebSocket from "ws";
import waitForSocketState from "../utils/waitForSocketState";
import executeWhen from "../utils/executeWhen";
import Event from "../../../src/event/Event";
import UserPlaceBid from "../../../src/event/events/UserPlaceBid";
import Haven from "../../../src/tool/Haven/Haven";

const WEBSOCKET_PORT: number = getRandomTestPort();
const CLOSE_AFTER = 0.1 * 1000;

describe("product", () => {
  let wss: WebSocket.Server;

  beforeAll(() => {
    wss = createWebSocketServer(WEBSOCKET_PORT);
  });

  afterAll(() => {
    wss.close();
  });

  it(
    "user connect and receive highestBiddingPrice and countOfUserBidding from server",
    async () => {
      const productId = 10;

      const userId = 10;
      const user = await Serene.user().getById(userId);
      const userToken = await Haven.AccessToken().setUser(user).create();

      const userCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/product?productId=${productId}&access_token=${userToken}`
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

      expect(userReceivedMessage.type).toBe("server.send:product");
      expect(userReceivedMessage.data.countOfUserBidding).toBeDefined();
      expect(userReceivedMessage.data.highestBiddingPrice).toBeDefined();
    },
    CLOSE_AFTER * 10
  );

  it(
    "user place a bid, and server push updated product for all other users on the product channel",
    async () => {
      const user1Id = 10;
      const user2Id = 11;
      const user3Id = 12;
      const customerId = 13;

      const user1 = await Serene.user().getById(user1Id);
      const user2 = await Serene.user().getById(user2Id);
      const user3 = await Serene.user().getById(user3Id);
      const customer = await Serene.user().getById(customerId);

      const user1Token = await Haven.AccessToken().setUser(user1).create();
      const user2Token = await Haven.AccessToken().setUser(user2).create();
      const user3Token = await Haven.AccessToken().setUser(user3).create();

      const productId = 10;
      const product = await Serene.product().getById(productId);

      const biddingPrice = 300;

      // under same channel
      const user1Cli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/product?productId=${productId}&access_token=${user1Token}`
      );
      const user2Cli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/product?productId=${productId}&access_token=${user2Token}`
      );
      const user3Cli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/product?productId=${productId}&access_token=${user3Token}`
      );

      let user1Received = 0;
      let user2Received = 0;
      let user3Received = 0;

      let user1ReceivedMessage: any;
      let user2ReceivedMessage: any;
      let user3ReceivedMessage: any;

      user1Cli.onopen = () => {
        user1Cli.on("message", (message) => {
          if (user1Received === 1) {
            user1ReceivedMessage = bufferToObj(message);
          }
          user1Received++;
        });
      };

      user2Cli.onopen = () => {
        user2Cli.on("message", (message) => {
          if (user2Received === 1) {
            user2ReceivedMessage = bufferToObj(message);
          }
          user2Received++;
        });
      };

      user3Cli.onopen = () => {
        user3Cli.on("message", (message) => {
          if (user3Received === 1) {
            user3ReceivedMessage = bufferToObj(message);
          }
          user3Received++;
        });
      };

      setTimeout(() => {
        user1Cli.close();
        user2Cli.close();
        user3Cli.close();
      }, CLOSE_AFTER * 5);

      executeWhen(user1Cli, user1Cli.OPEN, () => {
        Event.occur(
          new UserPlaceBid().from(customer).to(product).for(biddingPrice)
        );
      });

      await waitForSocketState(user1Cli, user1Cli.CLOSED);
      await waitForSocketState(user2Cli, user2Cli.CLOSED);
      await waitForSocketState(user3Cli, user3Cli.CLOSED);

      expect(user1ReceivedMessage.type).toBe(
        "server.broadcast:updated_product"
      );
      expect(user2ReceivedMessage.type).toBe(
        "server.broadcast:updated_product"
      );
      expect(user3ReceivedMessage.type).toBe(
        "server.broadcast:updated_product"
      );
    },
    CLOSE_AFTER * 10
  );

  it(
    "user place a bid, and then server push notification to seller",
    async () => {
      // seller and product
      const productId = 10;
      const product = await Serene.product()
        .where({
          id: productId,
        })
        .include({
          user: true,
        })
        .get();

      const userId = 99;
      const user = await Serene.user().getById(userId);

      const seller = await Serene.user().getById(product.user.id);
      const sellerToken = await Haven.AccessToken().setUser(seller).create();

      const sellerCli = new WebSocket(`
      ws://localhost:${WEBSOCKET_PORT}/notification?access_token=${sellerToken}
    `);

      let sellerReceived = 0;
      let sellerReceivedMessage: any;

      sellerCli.onopen = () => {
        sellerCli.on("message", (message) => {
          if (sellerReceived === 1) {
            sellerReceivedMessage = bufferToObj(message);
          }
          sellerReceived++;
        });
      };

      executeWhen(sellerCli, sellerCli.OPEN, () => {
        Event.occur(new UserPlaceBid().from(user).to(product).for(10000));
      });

      setTimeout(() => {
        sellerCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(sellerCli, sellerCli.CLOSED);

      expect(sellerReceived).toBe(2);
      expect(sellerReceivedMessage.type).toBe("server.send:new_notification");
    },
    CLOSE_AFTER * 10
  );

  it(
    "guest user can connect and receive highestBiddingPrice and countOfUserBidding from server",
    async () => {
      const productId = 10;

      const guestCli = new WebSocket(
        `ws://localhost:${WEBSOCKET_PORT}/product?productId=${productId}&access_token=`
      );

      let guestReceived = 0;

      let guestReceivedMessage: any;

      guestCli.onopen = () => {
        guestCli.on("message", (message) => {
          if (guestReceived === 0) {
            guestReceivedMessage = bufferToObj(message);
          }
          guestReceived++;
        });
      };

      setTimeout(() => {
        guestCli.close();
      }, CLOSE_AFTER * 5);

      await waitForSocketState(guestCli, guestCli.CLOSED);

      expect(guestReceivedMessage.type).toBe("server.send:product");
      expect(guestReceivedMessage.data.countOfUserBidding).toBeDefined();
      expect(guestReceivedMessage.data.highestBiddingPrice).toBeDefined();
    },
    CLOSE_AFTER * 10
  );
});
