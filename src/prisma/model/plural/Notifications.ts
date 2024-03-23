import { PrismaClient } from "@prisma/client";
import { WithColumnType } from "../type/type";
import Plural from "../base/Plural";

export default class Notifications extends Plural<
  "notification",
  WithColumnType,
  "notification"
> {
  constructor(prismaModel: PrismaClient["notification"]) {
    super(prismaModel);
  }
}
