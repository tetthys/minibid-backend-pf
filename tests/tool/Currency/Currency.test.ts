import Decimal from "decimal.js";
import Serene from "../../../src/prisma/factory/Serene";
import Haven from "../../../src/tool/Haven/Haven";

const getEurPerUsd = async () => {
  const eurPerUsd = await Serene.prisma().exchange.findFirstOrThrow({
    where: {
      currency: "eur",
    },
  });
  return eurPerUsd.perUSD;
};

describe("Currency", () => {
  const dollar = new Decimal(123.123456);

  it("usd to eur", async () => {
    const eurPerUsd: any = await getEurPerUsd();
    const exchangedPrice = Decimal.mul(dollar, eurPerUsd).toDP(6).toNumber();

    const converted = await Haven.Currency()
      .from("usd")
      .amount(dollar)
      .to("eur")
      .convert();
    expect(converted).toBe(exchangedPrice);
  });

  it("add symbol works", async () => {
    const eurPerUsd: any = await getEurPerUsd();
    const exchangedPrice = Decimal.mul(dollar, eurPerUsd).toDP(6).toNumber();

    const converted = await Haven.Currency()
      .from("usd")
      .amount(dollar)
      .to("eur")
      .addSymbol()
      .convert();
    expect(converted).toBe(`€ ${exchangedPrice}`);
  });

  it("withFormat works", async () => {
    const eurPerUsd: any = await getEurPerUsd();
    const exchangedPrice = Decimal.mul(dollar, eurPerUsd).toDP(6).toNumber();

    const converted = await Haven.Currency()
      .from("usd")
      .amount(dollar)
      .to("eur")
      .addSymbol()
      .withFormat()
      .convert();
    const formattedExchangedPrice = exchangedPrice.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    expect(converted).toBe(`€ ${formattedExchangedPrice}`);
  });

  it("eur to usd", async () => {
    const euro = new Decimal(123.123456);
    const eurPerUsd: any = await getEurPerUsd();

    const converted = await Haven.Currency()
      .from("eur")
      .amount(euro)
      .to("usd")
      .convert();
    expect(converted).toBe(Decimal.div(euro, eurPerUsd).toDP(6).toNumber());
  });

  it("this.amount decimal test", async () => {
    const lastLessThanFive = new Decimal(123.1234561); // 123.123456
    const lastGreaterThanFive = new Decimal(123.1234565); // 123.123457

    const convertedWithLastLessThanFive = await Haven.Currency()
      .from("eur")
      .amount(lastLessThanFive)
      .to("usd")
      .convert();

    const convertedWithLastGreaterThanFive = await Haven.Currency()
      .from("eur")
      .amount(lastGreaterThanFive)
      .to("usd")
      .convert();

    expect(convertedWithLastLessThanFive).not.toBe(
      convertedWithLastGreaterThanFive
    );
  });

  it("fromBaseCurrency", async () => {
    const dollar = new Decimal(123.123456);
    const eurPerUsd: any = await getEurPerUsd();

    const converted = await Haven.Currency()
      .fromBaseCurrency()
      .amount(dollar)
      .to("eur")
      .convert();

    expect(converted).toBe(Decimal.mul(dollar, eurPerUsd).toDP(6).toNumber());
  });

  it("toBaseCurrency", async () => {
    const euro = new Decimal(123.123456);
    const eurPerUsd: any = await getEurPerUsd();

    const converted = await Haven.Currency()
      .from("eur")
      .amount(euro)
      .toBaseCurrency()
      .convert();

    expect(converted).toBe(Decimal.div(euro, eurPerUsd).toDP(6).toNumber());
  });
});
