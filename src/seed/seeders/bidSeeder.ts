import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const bidSeeder = async (i: number) => {
  console.log("Creating bid" + i + "..");
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
  await prisma.bid.create({
    data: {
      userId: await getRandomUserId(),
      productId: await getRandomProductId(),
      biddingPrice: 456456.456456,
    },
  });
};
export default bidSeeder;
