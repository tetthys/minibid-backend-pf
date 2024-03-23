import WebSocket from "ws";

const returnSocketWhen = (
  socket: WebSocket,
  state: any,
  callback: Function
) => {
  setTimeout(() => {
    if (socket.readyState === state) {
      callback(socket);
    } else {
      returnSocketWhen(socket, state, callback);
    }
  }, 0);
};

export default returnSocketWhen;
