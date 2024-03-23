import Serene from "../../factory/Serene";
import CustomField from "../CustomField";

type Id = number | bigint;
type Result = { highestBiddingPrice: number };

export default class HighestBiddingPrice extends CustomField {
  public async get(productId: Id): Promise<Result> {
    let rawQueryResult: any = await Serene.prisma()
      .$queryRaw`SELECT  MAX(Bid.biddingPrice) AS highestBiddingPrice
        FROM Product
        INNER JOIN Bid
        ON Product.id = Bid.productId
        WHERE Product.id = ${productId}`;
    return rawQueryResult[0];
  }

  public getType(): string {
    return "highestBiddingPrice";
  }
}
