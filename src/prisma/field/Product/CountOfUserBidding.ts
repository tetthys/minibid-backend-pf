import Serene from "../../factory/Serene";
import CustomField from "../CustomField";

type Id = number | bigint;
type Result = { countOfUserBidding: number };

export default class CountOfUserBidding extends CustomField {
  public async get(productId: Id): Promise<Result> {
    let rawQueryResult: any = await Serene.prisma()
      .$queryRaw`SELECT  COUNT(DISTINCT User.id) AS countOfUserBidding
        FROM User
        INNER JOIN Bid
        ON User.id = Bid.userId
        INNER JOIN Product
        ON Product.id = Bid.productId
        WHERE productId = ${productId};`;
    return rawQueryResult[0];
  }

  public getType(): string {
    return "countOfUserBidding";
  }
}
