import Serene from "../../factory/Serene";
import CustomField from "../CustomField";

type Id = number | bigint;
type Result = { countOfUserBought: number };

export default class CountOfUserBought extends CustomField {
  public async get(userId: Id): Promise<Result> {
    const rawQueryResult: any = await Serene.prisma()
      .$queryRaw`SELECT  COUNT(*) AS countOfUserBought
        FROM User
        INNER JOIN Checkout
        ON User.id = Checkout.userId
        WHERE User.id = ${userId}`;
    return rawQueryResult[0];
  }

  public getType(): string {
    return "countOfUserBought";
  }
}
