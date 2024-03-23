import { PrismaClient } from "@prisma/client";
import { ProductWithColumnType } from "../type/type";
import Singular from "../base/Singular";

export default class Product extends Singular<
  "product",
  ProductWithColumnType,
  "product"
> {
  constructor(model: PrismaClient["product"]) {
    super(model);
  }
}
