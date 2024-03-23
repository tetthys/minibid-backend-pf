import exchangeSeeder from "./seeders/special/exchangeSeeder";

const uniqueSeeder = async () => {
  await exchangeSeeder();
};

export default uniqueSeeder;
