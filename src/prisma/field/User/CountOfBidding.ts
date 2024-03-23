import Serene from "../../factory/Serene";
import CustomField from "../CustomField";

type Id = number | bigint;
type Result = { countOfBidding: number };

export default class CountOfBidding extends CustomField {
  public async get(userId: Id): Promise<Result> {
    const rawQueryResult: any = await Serene.prisma()
      .$queryRaw`SELECT  COUNT(*) AS countOfBidding
        FROM User
        INNER JOIN Bid
        ON User.id = Bid.userId
        WHERE User.id = ${userId}`;
    return rawQueryResult[0];
  }

  public getType(): string {
    return "countOfBidding";
  }
}
