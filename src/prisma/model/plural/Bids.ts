import { PrismaClient } from "@prisma/client";
import { WithColumnType } from "../type/type";
import Plural from "../base/Plural";

export default class Bids extends Plural<"bid", WithColumnType, "bid"> {
  constructor(prismaModel: PrismaClient["bid"]) {
    super(prismaModel);
  }
}
