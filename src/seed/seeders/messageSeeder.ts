import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const messageSeeder = async (i: number) => {
  console.log("Creating message" + i + "..");
  const getRandomUserId = async () => {
    const count = await prisma.user.count();
    const skip = Math.floor(Math.random() * count);
    const random = await prisma.user.findMany({
      take: 1,
      skip: skip,
    });
    return random[0].id;
  };
  await prisma.message.create({
    data: {
      senderId: await getRandomUserId(),
      receiverId: await getRandomUserId(),
      data: faker.lorem.sentences({ min: 1, max: 5 }),
    },
  });
};
export default messageSeeder;
