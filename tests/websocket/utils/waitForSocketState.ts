const waitForSocketState = (socket: any, state: any) => {
  return new Promise(function (resolve: any) {
    setTimeout(function () {
      if (socket.readyState === state) {
        resolve();
      } else {
        waitForSocketState(socket, state).then(resolve);
      }
    }, 5);
  });
};

export default waitForSocketState;
