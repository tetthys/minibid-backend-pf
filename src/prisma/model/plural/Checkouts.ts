import { PrismaClient } from "@prisma/client";
import { WithColumnType } from "../type/type";
import Plural from "../base/Plural";

export default class Checkouts extends Plural<
  "checkout",
  WithColumnType,
  "checkout"
> {
  constructor(prismaModel: PrismaClient["checkout"]) {
    super(prismaModel);
  }
}
