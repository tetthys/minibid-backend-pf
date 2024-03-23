import WebSocket from "ws";

const executeWhen = (websocket: WebSocket, state: any, callback: Function) => {
  setTimeout(() => {
    if (websocket.readyState === state) {
      callback();
    } else {
      executeWhen(websocket, state, callback);
    }
  }, 0);
};

export default executeWhen;
