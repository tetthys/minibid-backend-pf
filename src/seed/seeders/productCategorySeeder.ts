import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const productCategorySeeder = async (i: number) => {
  console.log("Creating productCategory" + i + "..");
  const getRandomProductId = async () => {
    const count = await prisma.product.count();
    const skip = Math.floor(Math.random() * count);
    const random = await prisma.product.findMany({
      take: 1,
      skip: skip,
    });
    return random[0].id;
  };
  const getRandomCategoryId = async () => {
    const count = await prisma.category.count();
    const skip = Math.floor(Math.random() * count);
    const random = await prisma.category.findMany({
      take: 1,
      skip: skip,
    });
    return random[0].id;
  };

  // composite key

  const productId = await getRandomProductId();
  const categoryId = await getRandomCategoryId();

  const isAlreadyExist = await prisma.productCategory.findFirst({
    where: {
      productId: productId,
      categoryId: categoryId,
    }
  })

  if (isAlreadyExist) {
    return;
  }
  
  await prisma.productCategory.create({
    data: {
      productId: productId,
      categoryId: categoryId,
    },
  });
};
export default productCategorySeeder;
