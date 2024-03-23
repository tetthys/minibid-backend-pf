import Decimal from "decimal.js";
import Serene from "../../prisma/factory/Serene";

type Amount = number | Decimal;
type Price = number | string;

export default class Currency {
  private _amount: Decimal = new Decimal(0);

  private convertFrom: string = "usd";
  private convertTo: string = "usd";

  private _addSymbol: boolean = false;
  private _withFormat: boolean = false;

  public amount(amount: Amount): this {
    this._amount = new Decimal(amount).toDP(6);
    return this;
  }

  public from(currency: string): this {
    this.convertFrom = currency;
    return this;
  }

  public to(currency: string): this {
    this.convertTo = currency;
    return this;
  }

  public fromBaseCurrency(): this {
    this.convertFrom = "usd";
    return this;
  }

  public toBaseCurrency(): this {
    this.convertTo = "usd";
    return this;
  }

  public addSymbol(): this {
    this._addSymbol = true;
    return this;
  }

  public withFormat(): this {
    this._withFormat = true;
    return this;
  }

  public async convert(): Promise<Price> {
    const convertFromResult = await Serene.prisma().exchange.findFirstOrThrow({
      where: {
        currency: this.convertFrom,
      },
    });

    const convertToResult = await Serene.prisma().exchange.findFirstOrThrow({
      where: {
        currency: this.convertTo,
      },
    });

    let exchangedPrice: Price = Decimal.mul(
      this._amount,
      Decimal.div(convertToResult.perUSD, convertFromResult.perUSD)
    )
      .toDP(6)
      .toNumber();

    if (this._withFormat) {
      exchangedPrice = exchangedPrice.toLocaleString("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    if (this._addSymbol) {
      exchangedPrice = `${this.getSymbol(this.convertTo)} ${exchangedPrice}`;
    }

    return exchangedPrice;
  }

  private getSymbol(currency: string): string {
    const formatter: any = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    });

    const symbol: string = formatter
      .formatToParts(0)
      .find(
        (part: { type: string; value: string }) => part.type === "currency"
      ).value;

    return symbol;
  }
}
