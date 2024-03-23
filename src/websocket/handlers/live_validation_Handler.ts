import WebSocket from "ws";
import bufferToObj from "../../helper/buffer/bufferToObj/bufferToObj";
import json from "../../helper/json/json";
import authRegisterValidation from "../../validate/validation/authRegisterValidation";
import handleWebSocketError from "./handleWebSocketError";
import createNewProductValidation from "../../validate/validation/createNewProductValidation";
import authSignInValidation from "../../validate/validation/authSignInValidation";
import createBidOnProductValidation from "../../validate/validation/createBidOnProductValidation";
import createUserCardValidation from "../../validate/validation/createUserCardValidation";
import createUserBankAccountValidation from "../../validate/validation/createUserBankAccountValidation";

const live_validation_Handler = async (ws: WebSocket, queryParams: any) => {
  if (queryParams.middleware === "authRegister") {
    ws.on("message", async (message: string) => {
      const msg = bufferToObj(message);
      if (msg.type === "client.send:data") {
        try {
          const error = await authRegisterValidation({
            body: msg.data,
            headers: {
              authorization: queryParams.access_token,
            },
          });
          error
            ? handleWebSocketError(ws, error)
            : ws.send(
                json({
                  type: "server.send:validation.success",
                  data: {},
                })
              );
        } catch (e) {
          throw e;
        }
      }
    });
  }
  if (queryParams.middleware === "createNewProduct") {
    ws.on("message", async (message: string) => {
      const msg = bufferToObj(message);
      if (msg.type === "client.send:data") {
        try {
          const error = await createNewProductValidation({
            body: msg.data,
            headers: {
              authorization: queryParams.access_token,
            },
          });
          error
            ? handleWebSocketError(ws, error)
            : ws.send(
                json({
                  type: "server.send:validation.success",
                  data: {},
                })
              );
        } catch (e) {
          throw e;
        }
      }
    });
  }
  if (queryParams.middleware === "authSignIn") {
    ws.on("message", async (message: string) => {
      const msg = bufferToObj(message);
      if (msg.type === "client.send:data") {
        try {
          const error = await authSignInValidation({
            body: msg.data,
            headers: {
              authorization: queryParams.access_token,
            },
          });
          error
            ? handleWebSocketError(ws, error)
            : ws.send(
                json({
                  type: "server.send:validation.success",
                  data: {},
                })
              );
        } catch (e) {
          throw e;
        }
      }
    });
  }
  if (queryParams.middleware === "createBidOnProduct") {
    ws.on("message", async (message: string) => {
      const msg = bufferToObj(message);
      if (msg.type === "client.send:data") {
        try {
          const error = await createBidOnProductValidation({
            body: msg.data,
            headers: {
              authorization: queryParams.access_token,
            },
          });
          error
            ? handleWebSocketError(ws, error)
            : ws.send(
                json({
                  type: "server.send:validation.success",
                  data: {},
                })
              );
        } catch (e) {
          throw e;
        }
      }
    });
  }
  if (queryParams.middleware === "createUserCard")
    ws.on("message", async (message: string) => {
      const msg = bufferToObj(message);
      if (msg.type === "client.send:data") {
        try {
          const error = await createUserCardValidation({
            body: msg.data,
            headers: {
              authorization: queryParams.access_token,
            },
          });
          error
            ? handleWebSocketError(ws, error)
            : ws.send(
                json({
                  type: "server.send:validation.success",
                  data: {},
                })
              );
        } catch (e) {
          throw e;
        }
      }
    });
  if (queryParams.middleware === "createUserBankAccount") {
    ws.on("message", async (message: string) => {
      const msg = bufferToObj(message);
      if (msg.type === "client.send:data") {
        try {
          const error = await createUserBankAccountValidation({
            body: msg.data,
            headers: {
              authorization: queryParams.access_token,
            },
          });
          error
            ? handleWebSocketError(ws, error)
            : ws.send(
                json({
                  type: "server.send:validation.success",
                  data: {},
                })
              );
        } catch (e) {
          throw e;
        }
      }
    });
  }
};

export default live_validation_Handler;
