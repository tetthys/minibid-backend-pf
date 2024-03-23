import Haven from "../../tool/Haven/Haven";
import Wrapper from "../base/Wrapper";

export default class ConvertToUserCurrency extends Wrapper {
  protected async convertObject(originalObject: any) {
    let userCurrency = "USD";
    if (Haven.AccessToken().reqHasToken(this.request)) {
      const user = await Haven.AccessToken().findUserByToken(
        this.request.headers.authorization
      );
      userCurrency = user.currency;
    }

    let resultObject: any = {};
    if (originalObject.startingPrice) {
      const startingPriceConverted = await Haven.Currency()
        .toBaseCurrency()
        .amount(originalObject.startingPrice)
        .to(userCurrency)
        .addSymbol()
        .withFormat()
        .convert();
      resultObject = {
        ...resultObject,
        startingPrice: startingPriceConverted,
      };
    }
    if (originalObject.highestBiddingPrice) {
      const highestBiddingPriceConverted = await Haven.Currency()
        .toBaseCurrency()
        .amount(originalObject.highestBiddingPrice)
        .to(userCurrency)
        .addSymbol()
        .withFormat()
        .convert();
      resultObject = {
        ...resultObject,
        highestBiddingPrice: highestBiddingPriceConverted,
      };
    }
    if (originalObject.sumOfUserBought) {
      const sumOfUserBoughtConverted = await Haven.Currency()
        .toBaseCurrency()
        .amount(originalObject.sumOfUserBought)
        .to(userCurrency)
        .addSymbol()
        .withFormat()
        .convert();
      resultObject = {
        ...resultObject,
        sumOfUserBought: sumOfUserBoughtConverted,
      };
    }
    if (originalObject.sumOfUserSold) {
      const sumOfUserSoldConverted = await Haven.Currency()
        .toBaseCurrency()
        .amount(originalObject.sumOfUserSold)
        .to(userCurrency)
        .addSymbol()
        .withFormat()
        .convert();
      resultObject = {
        ...resultObject,
        sumOfUserSold: sumOfUserSoldConverted,
      };
    }
    if (originalObject.price) {
      const priceConverted = await Haven.Currency()
        .toBaseCurrency()
        .amount(originalObject.price)
        .to(userCurrency)
        .addSymbol()
        .withFormat()
        .convert();
      resultObject = {
        ...resultObject,
        price: priceConverted,
      };
    }
    if (originalObject.biddingPrice) {
      const biddingPriceConverted = await Haven.Currency()
        .toBaseCurrency()
        .amount(originalObject.biddingPrice)
        .to(userCurrency)
        .addSymbol()
        .withFormat()
        .convert();
      resultObject = {
        ...resultObject,
        biddingPrice: biddingPriceConverted,
      };
    }
    if (originalObject.amount) {
      const amountConverted = await Haven.Currency()
        .toBaseCurrency()
        .amount(originalObject.amount)
        .to(userCurrency)
        .addSymbol()
        .withFormat()
        .convert();
      resultObject = {
        ...resultObject,
        amount: amountConverted,
      };
    }
    return {
      ...originalObject,
      ...resultObject,
    };
  }
}
