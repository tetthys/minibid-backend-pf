import Serene from "../../factory/Serene";
import CustomField from "../CustomField";

type Id = number | bigint;
type Result = { countOfUserSold: number };

export default class CountOfUserSold extends CustomField {
  public async get(userId: Id): Promise<Result> {
    const rawQueryResult: any = await Serene.prisma()
      .$queryRaw`SELECT  COUNT(*) AS countOfUserSold
        FROM Product
        INNER JOIN Checkout
        ON Product.id = Checkout.productId
        INNER JOIN User
        ON User.id = Product.userId
        WHERE User.id = ${userId}`;
    return rawQueryResult[0];
  }

  public getType(): string {
    return "countOfUserSold";
  }
}
