import env from "../../helper/env/env";
import Serene from "../../prisma/factory/Serene";
import Command from "../base/Command";

export default class UpdateExchangeRate implements Command {
  public async execute() {
    const res = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${env(
        "FREE_CURRENCY_API_KEY"
      )}&currencies=`
    );
    const data = await res.json();

    for (const key in data.data) {
      let currency = key;
      let perUSD = data.data[key].toFixed(6);
      console.log("currency: " + currency + ", perUSD: " + perUSD);
      await Serene.prisma().exchange.create({
        data: {
          currency: currency,
          perUSD: perUSD,
        },
      });
    }
  }
}
