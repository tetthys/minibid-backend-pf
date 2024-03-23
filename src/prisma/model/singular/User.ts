import { PrismaClient } from "@prisma/client";
import { UserWithColumnType } from "../type/type";
import Singular from "../base/Singular";

export default class User extends Singular<"user", UserWithColumnType, "user"> {
  constructor(model: PrismaClient["user"]) {
    super(model);
  }
}
