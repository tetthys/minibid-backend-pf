import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import getRandomState from "./utils/getRandomState";
import json from "../../helper/json/json";

const prisma = new PrismaClient();

const withdrawalSeeder = async (i: number) => {
  console.log("Creating withdrawal" + i + "..");
  const getRandomUserId = async () => {
    const count = await prisma.user.count();
    const skip = Math.floor(Math.random() * count);
    const random = await prisma.user.findMany({
      take: 1,
      skip: skip,
    });
    return random[0].id;
  };
  const getRandomProduct = async () => {
    const count = await prisma.product.count();
    const skip = Math.floor(Math.random() * count);
    const random = await prisma.product.findMany({
      take: 1,
      skip: skip,
    });
    return random[0];
  };
  await prisma.withdrawal.create({
    data: {
      userId: await getRandomUserId(),
      state: getRandomState(),
      amount: 999999.999999,
      product: json(await getRandomProduct()),
    },
  });
};
export default withdrawalSeeder;
