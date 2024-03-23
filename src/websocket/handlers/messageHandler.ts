import WebSocket from "ws";
import Serene from "../../prisma/factory/Serene";
import json from "../../helper/json/json";
import AuthError from "../../tool/Auth/error/AuthError";
import Event from "../../event/Event";
import UserSendMessage from "../../event/events/UserSendMessage";
import bufferToObj from "../../helper/buffer/bufferToObj/bufferToObj";
import Haven from "../../tool/Haven/Haven";

const messageHandler = async (ws: WebSocket, queryParams: any) => {
  const senderId = queryParams.senderId;
  const receiverId = queryParams.receiverId;

  // check is valid user
  try {
    const user = await Haven.AccessToken().findUserByToken(
      queryParams.access_token
    );
    if (user.id !== BigInt(senderId)) {
      ws.close();
    }
  } catch (e) {
    if (e instanceof AuthError) {
      ws.send(json(e.get()));
    }
  }

  Haven.WSC().pathname("/message").push({
    queryParams: queryParams,
    ws: ws,
  });

  const previousMessages = await Serene.messages()
    .select({
      senderId: true,
      receiverId: true,
      data: true,
      createdAt: true,
    })
    .where({
      OR: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
    .orderBy({
      createdAt: "desc",
    })
    .get(50);

  /**
   * * server.send:receiver.data
   */

  const receiver = await Serene.prisma().user.findFirst({
    where: {
      id: receiverId,
    },
  });

  ws.send(
    json({
      type: "server.send:receiver.data",
      data: {
        id: receiver?.id,
        username: receiver?.username,
        lastSeen: await Haven.Cache().get("last_seen_" + receiver?.id),
      },
    })
  );

  ws.send(
    json({
      type: "server.send:previous_messages",
      data: previousMessages,
    })
  );

  ws.on("message", async (message: string) => {
    let msg = bufferToObj(message);
    if (msg.type === "client.send:new_message") {
      const receivedMessage = await Serene.prisma().message.create({
        data: {
          senderId: senderId,
          receiverId: receiverId,
          data: msg.data.message,
        },
        select: {
          senderId: true,
          receiverId: true,
          data: true,
          createdAt: true,
        },
      });
      ws.send(
        json({
          type: "server.echo:new_message",
          data: receivedMessage,
        })
      );

      const sender = await Serene.user().getById(senderId);
      const receiver = await Serene.user().getById(receiverId);

      Event.occur(new UserSendMessage().from(sender).to(receiver));

      // broadcast to valid clients
      Haven.WSC()
        .pathname("/message")
        .forAll((client) => {
          if (client.ws != ws) {
            if (
              (client.queryParams.senderId === senderId &&
                client.queryParams.receiverId === receiverId) ||
              (client.queryParams.senderId === receiverId &&
                client.queryParams.receiverId === senderId)
            ) {
              client.ws.send(
                json({
                  type: "server.broadcast:new_message",
                  data: receivedMessage,
                })
              );
            }
          }
        });
    }
  });
};

export default messageHandler;
