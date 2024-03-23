import WebSocket from "ws";
import { ValidationError } from "joi";
import AuthError from "../../tool/Auth/error/AuthError";
import json from "../../helper/json/json";
import InvalidAccessTokenError from "../../tool/AccessToken/error/InvalidAccessTokenError";
import { Prisma } from "@prisma/client";
import CustomValidationError from "../../validate/error/CustomValidationError";

const handleWebSocketError = (ws: WebSocket, e: any) => {
  if (e instanceof ValidationError) {
    ws.send(
      json({
        type: "server.send:validation.error",
        data: e.details,
      })
    );
    return;
  }
  if (e instanceof CustomValidationError) {
    ws.send(
      json({
        type: "server.send:validation.error",
        data: e.get(),
      })
    );
    return;
  }
  if (e instanceof AuthError) {
    ws.send(
      json({
        type: "server.send:validation.error",
        data: e.get(),
      })
    );
    return;
  }
  if (e instanceof InvalidAccessTokenError) {
    ws.send(
      json({
        type: "server.send:validation.error",
        data: e.get(),
      })
    );
    return;
  }
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    ws.send(
      json({
        type: "server.send:validation.error",
        data: e.message,
      })
    );
    return;
  }
  ws.send(
    json({
      type: "server.send:validation.error",
      data: [{ message: "INTERNAL SERVER ERROR", field: "", details: "" }],
    })
  );
  return;
};

export default handleWebSocketError;
