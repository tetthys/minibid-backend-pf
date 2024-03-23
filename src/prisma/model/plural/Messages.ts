import { PrismaClient } from "@prisma/client";
import { ProductWithColumnType } from "../type/type";
import Plural from "../base/Plural";

export default class Messages extends Plural<
  "message",
  ProductWithColumnType,
  "message"
> {
  constructor(prismaModel: PrismaClient["message"]) {
    super(prismaModel);
  }
}
