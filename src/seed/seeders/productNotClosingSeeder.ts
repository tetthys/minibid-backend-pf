import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const productNotClosingSeeder = async (i: number) => {
  console.log("Creating productNotClosing" + i + "..");
  const getRandomUserId = async () => {
    const count = await prisma.user.count();
    const skip = Math.floor(Math.random() * count);
    const random = await prisma.user.findMany({
      take: 1,
      skip: skip,
    });
    return random[0].id;
  };
  await prisma.product.create({
    data: {
      userId: await getRandomUserId(),
      name: "product" + i,
      shortDescription: faker.lorem.words(5),
      description: faker.lorem.paragraphs(5),
      startingPrice: 112233.445566,
      endAt: faker.date.between({
        from: "2050-01-01",
        to: "2100-12-31",
      }),
    },
  });
};
export default productNotClosingSeeder;
