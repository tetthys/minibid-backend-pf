import WebSocket from "ws";
import Serene from "../../prisma/factory/Serene";
import json from "../../helper/json/json";
import bufferToObj from "../../helper/buffer/bufferToObj/bufferToObj";
import Haven from "../../tool/Haven/Haven";
import InvalidAccessTokenError from "../../tool/AccessToken/error/InvalidAccessTokenError";

const notificationHandler = async (ws: WebSocket, queryParams: any) => {
  try {
    const user = await Haven.AccessToken().findUserByToken(
      queryParams.access_token
    );
    Haven.WSC().pathname("/notification").push({
      ws: ws,
      queryParams: queryParams,
    });
    const previousNotifications = await Serene.notifications()
      .where({
        userId: user.id,
      })
      .orderBy({
        createdAt: "desc",
      })
      .select({
        id: true,
        data: true,
        createdAt: true,
      })
      .get(30);
    ws.send(
      json({
        type: "server.send:previous_notifications",
        data: previousNotifications,
      })
    );
  } catch (e) {
    if (e instanceof InvalidAccessTokenError) {
      ws.send(
        json({
          type: "server.send:error",
          data: e.get(),
        })
      );
    }
  }

  ws.on("message", async (message: any) => {
    let msg = bufferToObj(message);
    if (msg.type === "client.send:delete.notification") {
      const user = await Haven.AccessToken().findUserByToken(
        queryParams.access_token
      );
      const deleted = await Serene.prisma().notification.delete({
        where: {
          id: BigInt(msg.data.id),
          userId: BigInt(user.id),
        },
      });
      ws.send(
        json({
          type: "server.send:delete.notification",
          data: {
            message: "sucessfully deleted",
            deleted: deleted,
          },
        })
      );
    }
    if (msg.type === "client.send:delete.all_notifications") {
      const user = await Haven.AccessToken().findUserByToken(
        queryParams.access_token
      );
      const deleted = await Serene.prisma().notification.deleteMany({
        where: {
          userId: BigInt(user.id),
        },
      });
      ws.send(
        json({
          type: "server.send:delete.all_notifications",
          data: {
            message: "sucessfully deleted all notifications",
          },
        })
      );
    }
  });
};

export default notificationHandler;
