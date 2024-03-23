import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import getRandomState from "./utils/getRandomState";

const prisma = new PrismaClient();

const checkoutSeeder = async (i: number) => {
  console.log("Creating checkout" + i + "..");
  const getRandomUserId = async () => {
    const count = await prisma.user.count();
    const skip = Math.floor(Math.random() * count);
    const random = await prisma.user.findMany({
      take: 1,
      skip: skip,
    });
    return random[0].id;
  };
  const getRandomProductId = async () => {
    const count = await prisma.product.count();
    const skip = Math.floor(Math.random() * count);
    const random = await prisma.product.findMany({
      take: 1,
      skip: skip,
    });
    return random[0].id;
  };

  // composite key

  const userId = await getRandomUserId();
  const productId = await getRandomProductId();

  const isAlreadyExist = await prisma.checkout.findFirst({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  if (isAlreadyExist) {
    return;
  }

  await prisma.checkout.create({
    data: {
      userId: userId,
      productId: productId,
      price: 999999.999999,
      state: getRandomState()
    },
  });
};
export default checkoutSeeder;
