import WebSocket from "ws";
import url from "url";
import messageHandler from "./handlers/messageHandler";
import notificationHandler from "./handlers/notificationHandler";
import productHandler from "./handlers/productHandler";
import live_validation_Handler from "./handlers/live_validation_Handler";
import profile_setting_Handler from "./handlers/profile_setting_Handler";
import data_interface_Handler from "./handlers/data_interface_Handler";

const createWebSocketServer = (port: number) => {
  const wss = new WebSocket.Server({ port: port });

  wss.on("connection", (ws: WebSocket, req: any) => {
    const pathName = url.parse(req.url, true).pathname;
    const queryParams = url.parse(req.url, true).query;

    switch (pathName) {
      case "/message":
        messageHandler(ws, queryParams);
        break;
      case "/notification":
        notificationHandler(ws, queryParams);
        break;
      case "/product":
        productHandler(ws, queryParams);
        break;
      case "/data_interface":
        data_interface_Handler(ws, queryParams);
        break;
      case "/live_validation":
        live_validation_Handler(ws, queryParams);
        break;
      case "/profile_setting":
        profile_setting_Handler(ws, queryParams);
        break;
      default:
        break;
    }
  });

  return wss;
};

export default createWebSocketServer;
