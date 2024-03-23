import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import supportedCurrencies from "../../data/supportedCurrencies";

const prisma = new PrismaClient();

const userSeeder = async (i: number) => {
  console.log("Creating user" + i + "..");
  await prisma.user.create({
    data: {
      username: "user" + i,
      dateOfBirth: faker.date.between({
        from: "1980-01-01T00:00:00.000Z",
        to: "2000-01-01T00:00:00.000Z",
      }),
      phoneNumber: faker.phone.number(),
      password: '$2b$10$5cHw1/F63zoEKz/MxvztyuY/RNxJ.R/2pd9HY4dkdZtdkgVdlfEvS', // password
      currency: supportedCurrencies[Math.floor(Math.random() * supportedCurrencies.length)],
      email: faker.internet.email(),
    },
  });
};
export default userSeeder;
