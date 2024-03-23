import { PrismaClient } from "@prisma/client";
import { UserWithColumnType } from "../type/type";
import Plural from "../base/Plural";

export default class Users extends Plural<"user", UserWithColumnType, "user"> {
  constructor(prismaModel: PrismaClient["user"]) {
    super(prismaModel);
  }
}
