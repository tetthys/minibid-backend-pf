import WebSocket from "ws";

const send = (client: WebSocket, message: string) => {
  setTimeout(() => {
    client.send(message);
  }, 200);
};

export default send;
