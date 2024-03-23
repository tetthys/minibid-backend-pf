import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const categorySeeder = async (i: number) => {
  console.log("Creating category" + i + "..");
  await prisma.category.create({
    data: {
      name: faker.lorem.word(3),
    },
  });
};
export default categorySeeder;
