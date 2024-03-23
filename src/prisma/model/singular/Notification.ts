import { PrismaClient } from "@prisma/client";
import { WithColumnType } from "../type/type";
import Singular from "../base/Singular";

export default class Notification extends Singular<
  "notification",
  WithColumnType,
  "notification"
> {
  constructor(prismaModel: PrismaClient["notification"]) {
    super(prismaModel);
  }
}
