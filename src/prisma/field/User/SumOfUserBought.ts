import Serene from "../../factory/Serene";
import CustomField from "../CustomField";

type Id = number | bigint;
type Result = { sumOfUserBought: number };

export default class SumOfUserBought extends CustomField {
  public async get(userId: Id): Promise<Result> {
    const rawQueryResult: any = await Serene.prisma()
      .$queryRaw`SELECT  SUM(Checkout.price) AS sumOfUserBought
        FROM User
        INNER JOIN Checkout
        ON User.id = Checkout.userId
        WHERE User.id = ${userId}`;
    return rawQueryResult[0];
  }

  public getType(): string {
    return "sumOfUserBought";
  }
}
