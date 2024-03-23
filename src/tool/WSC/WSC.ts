import { WebSocket } from "ws";

type ExtendedWebSocketClient = {
  queryParams: any;
  ws: WebSocket;
};

export default class WSC {
  private _pathname: string = "";

  private static messageCliArr: Array<ExtendedWebSocketClient> = [];
  private static notificationCliArr: Array<ExtendedWebSocketClient> = [];
  private static productCliArr: Array<ExtendedWebSocketClient> = [];

  public pathname(pathname: string) {
    this._pathname = pathname;
    return this;
  }

  public push(client: ExtendedWebSocketClient) {
    switch (this._pathname) {
      case "/message":
        WSC.messageCliArr.push(client);
        break;
      case "/notification":
        WSC.notificationCliArr.push(client);
        break;
      case "/product":
        WSC.productCliArr.push(client);
        break;
      default:
        throw new Error("Invalid pathname");
    }
  }

  public getAll() {
    switch (this._pathname) {
      case "/message":
        return WSC.messageCliArr;
      case "/notification":
        return WSC.notificationCliArr;
      case "/product":
        return WSC.productCliArr;
      default:
        throw new Error("Invalid pathname");
    }
  }

  public forAll(callback: (client: ExtendedWebSocketClient) => void) {
    switch (this._pathname) {
      case "/message":
        WSC.messageCliArr.forEach((client) => {
          if (client.ws.readyState === WebSocket.OPEN) {
            callback(client);
          }
        });
        break;
      case "/notification":
        WSC.notificationCliArr.forEach((client) => {
          if (client.ws.readyState === WebSocket.OPEN) {
            callback(client);
          }
        });
        break;
      case "/product":
        WSC.productCliArr.forEach((client) => {
          if (client.ws.readyState === WebSocket.OPEN) {
            callback(client);
          }
        });
        break;
      default:
        throw new Error("Invalid pathname");
    }
  }
}
