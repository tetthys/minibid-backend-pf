import bidSeeder from "./seeders/bidSeeder";
import categorySeeder from "./seeders/categorySeeder";
import checkoutSeeder from "./seeders/checkoutSeeder";
import messageSeeder from "./seeders/messageSeeder";
import productCategorySeeder from "./seeders/productCategorySeeder";
import productImageSeeder from "./seeders/productImageSeeder";
import productSeeder from "./seeders/productSeeder";
import userSeeder from "./seeders/userSeeder";
import withdrawalSeeder from "./seeders/withdrawalSeeder";
import uniqueSeeder from "./uniqueSeeder";

const seed = async () => {
  await uniqueSeeder();
  for (let i = 0; i < 100; i++) {
    await userSeeder(i);
  }
  for (let i = 0; i < 500; i++) {
    await productSeeder(i);
  }
  for (let i = 0; i < 5000; i++) {
    await bidSeeder(i);
  }
  for (let i = 0; i < 500; i++) {
    await checkoutSeeder(i);
  }
  for (let i = 0; i < 200; i++) {
    await withdrawalSeeder(i);
  }
  for (let i = 0; i < 2000; i++) {
    await messageSeeder(i);
  }
  for (let i = 0; i < 2500; i++) {
    await productImageSeeder(i);
  }
  for (let i = 0; i < 100; i++) {
    await categorySeeder(i);
  }
  for (let i = 0; i < 600; i++) {
    await productCategorySeeder(i);
  }
  console.log("Done!");
};

seed();
