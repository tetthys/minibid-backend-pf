import WebSocket from "ws";
import Serene from "../../prisma/factory/Serene";
import json from "../../helper/json/json";
import supportedCurrencies from "../../data/supportedCurrencies";

const data_interface_Handler = async (ws: WebSocket, queryParams: any) => {
  console.log("queryParams : ", queryParams);
  if (queryParams.categories) {
    const categories = await Serene.prisma().category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    ws.send(
      json({
        type: "server.send:categories",
        data: categories,
      })
    );
    ws.close();
  }
  if (queryParams.currencies) {
    ws.send(
      json({
        type: "server.send:currencies",
        data: supportedCurrencies,
      })
    );
    ws.close();
  }
};

export default data_interface_Handler;
