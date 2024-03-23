import WebSocket from "ws";
import bufferToObj from "../../helper/buffer/bufferToObj/bufferToObj";
import Haven from "../../tool/Haven/Haven";
import json from "../../helper/json/json";

const profile_setting_Handler = (ws: WebSocket, queryParams: any) => {
  ws.on("message", async (message) => {
    let msg = bufferToObj(message);

    if (queryParams.email) {
      if (msg.type === "client.send:email_to_change") {
        await Haven.EmailCode().to(msg.data.email).send();
        ws.send(
          json({
            type: "server.send:waiting_for_email_verification_code",
            data: {},
          })
        );
      }
      if (msg.type === "client.send:email_verification_code") {
        const isEmailValid = await Haven.EmailCode().verify(
          msg.data.code,
          msg.data.email
        );
        if (isEmailValid) {
          ws.send(
            json({
              type: "server.send:email_verification_success",
              data: {},
            })
          );
        }
      }
    }

    if (queryParams.phonenumber) {
      if (msg.type === "client.send:phonenumber_to_change") {
        await Haven.PhoneNumberCode().to(msg.data.phonenumber).send();
        ws.send(
          json({
            type: "server.send:waiting_for_phonenumber_verification_code",
            data: {},
          })
        );
      }
      if (msg.type === "client.send:phonenumber_verification_code") {
        const isPhoneNumberValid = await Haven.PhoneNumberCode().verify(
          msg.data.code,
          msg.data.phonenumber
        );
        if (isPhoneNumberValid) {
          ws.send(
            json({
              type: "server.send:phonenumber_verification_success",
              data: {},
            })
          );
        }
      }
    }
  });
};

export default profile_setting_Handler;
