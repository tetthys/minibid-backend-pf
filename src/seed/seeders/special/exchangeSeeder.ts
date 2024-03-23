import { PrismaClient } from "@prisma/client";
import env from "../../../helper/env/env";

const prisma = new PrismaClient();

const exchangeSeeder = async () => {
  const res = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${env("FREE_CURRENCY_API_KEY")}&currencies=`);
  const data = await res.json();

  for (const key in data.data) {
    let currency = key;
    let perUSD = data.data[key].toFixed(6);
    console.log("currency: " + currency + ", perUSD: " + perUSD);
    await prisma.exchange.create({
      data: {
        currency: currency,
        perUSD: perUSD,
      },
    });
  }
};

export default exchangeSeeder;