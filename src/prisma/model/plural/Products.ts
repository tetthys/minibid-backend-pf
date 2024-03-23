import { PrismaClient } from "@prisma/client";
import { ProductWithColumnType } from "../type/type";
import Plural from "../base/Plural";

export default class Products extends Plural<
  "product",
  ProductWithColumnType,
  "product"
> {
  constructor(prismaModel: PrismaClient["product"]) {
    super(prismaModel);
  }
}
