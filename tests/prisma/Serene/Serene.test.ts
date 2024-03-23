import { PrismaClient } from "@prisma/client";
import Serene from "../../../src/prisma/factory/Serene";
import Checkouts from "../../../src/prisma/model/plural/Checkouts";
import Products from "../../../src/prisma/model/plural/Products";
import Users from "../../../src/prisma/model/plural/Users";
import Product from "../../../src/prisma/model/singular/Product";
import User from "../../../src/prisma/model/singular/User";

describe("Serene", () => {
  it("prisma", async () => {
    const i = Serene.prisma();
    expect(i instanceof PrismaClient).toBe(true);
  });
  it("products", async () => {
    const i = Serene.products();
    expect(i instanceof Products).toBe(true);
  });
  it("product", async () => {
    const i = Serene.product();
    expect(i instanceof Product).toBe(true);
  });
  it("users", async () => {
    const i = Serene.users();
    expect(i instanceof Users).toBe(true);
  });
  it("user", async () => {
    const i = Serene.user();
    expect(i instanceof User).toBe(true);
  });
  it("checkouts", async () => {
    const i = Serene.checkouts();
    expect(i instanceof Checkouts).toBe(true);
  });
});
