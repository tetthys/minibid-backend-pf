import { WebSocket } from "ws";
import WSC from "../../../src/tool/WSC/WSC";

type ExtendedWebSocketClient = {
  queryParams: any;
  ws: WebSocket;
};

describe("WSC", () => {
  it("push work on /message", async () => {
    const messageCli1 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const messageCli2 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const messageCli3 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    new WSC().pathname("/message").push(messageCli1);
    new WSC().pathname("/message").push(messageCli2);
    new WSC().pathname("/message").push(messageCli3);
    expect(new WSC().pathname("/message").getAll()).toEqual([
      messageCli1,
      messageCli2,
      messageCli3,
    ]);
  });
  it("push work on /notification", async () => {
    const notificationCli1 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const notificationCli2 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const notificationCli3 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const notificationCli4 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const notificationCli5 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    new WSC().pathname("/notification").push(notificationCli1);
    new WSC().pathname("/notification").push(notificationCli2);
    new WSC().pathname("/notification").push(notificationCli3);
    new WSC().pathname("/notification").push(notificationCli4);
    new WSC().pathname("/notification").push(notificationCli5);
    expect(new WSC().pathname("/notification").getAll()).toEqual([
      notificationCli1,
      notificationCli2,
      notificationCli3,
      notificationCli4,
      notificationCli5,
    ]);
  });
  it("check inequality of WSC instance", async () => {
    let isDeepEqual =
      new WSC().pathname("/message") === new WSC().pathname("/message");
    expect(isDeepEqual).toBe(false);
  });
  it("WSC instance return same clients", async () => {
    const wsCli1 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const wsCli2 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const wsCli3 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    new WSC().pathname("/message").push(wsCli1);
    new WSC().pathname("/message").push(wsCli2);
    new WSC().pathname("/message").push(wsCli3);
    let isEqual =
      new WSC().pathname("/message").getAll() ===
      new WSC().pathname("/message").getAll();
    expect(isEqual).toBe(true);
  });
  it("forAll method work", async () => {
    const wsCli1 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const wsCli2 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    const wsCli3 = {
      queryParams: "",
      ws: { readyState: 1 } as WebSocket,
    };
    new WSC().pathname("/product").push(wsCli1);
    new WSC().pathname("/product").push(wsCli2);
    new WSC().pathname("/product").push(wsCli3);

    let called = 0;

    new WSC().pathname("/product").forAll((client: ExtendedWebSocketClient) => {
      called++;
    });

    expect(called).toBe(3);
  });
});
