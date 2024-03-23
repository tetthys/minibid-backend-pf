import { PrismaClient } from "@prisma/client";
import { WithColumnType } from "../type/type";
import Plural from "../base/Plural";

export default class Withdrawals extends Plural<
  "withdrawal",
  WithColumnType,
  "withdrawal"
> {
  constructor(prismaModel: PrismaClient["withdrawal"]) {
    super(prismaModel);
  }
}
