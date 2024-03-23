import { PrismaClient } from "@prisma/client";
import { ProductWithColumnType } from "../type/type";
import Singular from "../base/Singular";

export default class Message extends Singular<
  "message",
  ProductWithColumnType,
  "message"
> {
  constructor(prismaModel: PrismaClient["message"]) {
    super(prismaModel);
  }
}
