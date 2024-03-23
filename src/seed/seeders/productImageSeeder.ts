import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const productImageSeeder = async (i: number) => {
  console.log("Creating productImage" + i + "..");
  const getRandomProductId = async () => {
    const count = await prisma.product.count();
    const skip = Math.floor(Math.random() * count);
    const random = await prisma.product.findMany({
      take: 1,
      skip: skip,
    });
    return random[0].id;
  };
  await prisma.productImage.create({
    data: {
      productId: await getRandomProductId(),
      path: faker.image.url(),
    },
  });
};
export default productImageSeeder;
