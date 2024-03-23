import WebSocket from "ws";
import json from "../../helper/json/json";
import Serene from "../../prisma/factory/Serene";
import ConvertToUserCurrency from "../../wrapper/wrappers/ConvertToUserCurrency";
import Haven from "../../tool/Haven/Haven";

const productHandler = async (ws: WebSocket, queryParams: any) => {
  try {
    Haven.WSC().pathname("/product").push({
      ws: ws,
      queryParams: queryParams,
    });
    const result = await Serene.product()
      .where({
        id: queryParams.productId,
      })
      .select({
        id: true,
        startingPrice: true,
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get();
    const wrapped = await new ConvertToUserCurrency()
      .setRequest({
        headers: {
          authorization: queryParams.access_token,
        },
      })
      .setResult(result)
      .get();
    ws.send(
      json({
        type: "server.send:product",
        data: wrapped,
      })
    );
  } catch (e: any) {
    console.log(e);
  }
};

export default productHandler;
