import PrismaClientSingletone from "../PrismaClient/singletone/PrismaClientSingletone";
import CountOfUserBidding from "../field/Product/CountOfUserBidding";
import HighestBiddingPrice from "../field/Product/HighestBiddingPrice";
import CountOfBidding from "../field/User/CountOfBidding";
import CountOfUserBought from "../field/User/CountOfUserBought";
import CountOfUserSold from "../field/User/CountOfUserSold";
import CreditLevel from "../field/User/CreditLevel";
import SumOfUserBought from "../field/User/SumOfUserBought";
import SumOfUserSold from "../field/User/SumOfUserSold";
import Bids from "../model/plural/Bids";
import Checkouts from "../model/plural/Checkouts";
import Messages from "../model/plural/Messages";
import Notifications from "../model/plural/Notifications";
import Products from "../model/plural/Products";
import Users from "../model/plural/Users";
import Withdrawals from "../model/plural/Withdrawals";
import Message from "../model/singular/Message";
import Notification from "../model/singular/Notification";
import Product from "../model/singular/Product";
import User from "../model/singular/User";

export default class Serene {
  public static prisma() {
    return PrismaClientSingletone.getInstance();
  }
  public static products() {
    return new Products(Serene.prisma().product).registerCustomField([
      new CountOfUserBidding(),
      new HighestBiddingPrice(),
    ]);
  }
  public static product() {
    return new Product(Serene.prisma().product).registerCustomField([
      new CountOfUserBidding(),
      new HighestBiddingPrice(),
    ]);
  }
  public static users() {
    return new Users(Serene.prisma().user).registerCustomField([
      new CountOfUserBought(),
      new CountOfUserSold(),
      new SumOfUserBought(),
      new SumOfUserSold(),
      new CountOfBidding(),
      new CreditLevel(),
    ]);
  }
  public static user() {
    return new User(Serene.prisma().user).registerCustomField([
      new CountOfUserBought(),
      new CountOfUserSold(),
      new SumOfUserBought(),
      new SumOfUserSold(),
      new CountOfBidding(),
      new CreditLevel(),
    ]);
  }
  public static checkouts() {
    return new Checkouts(Serene.prisma().checkout);
  }
  public static bids() {
    return new Bids(Serene.prisma().bid);
  }
  public static withdrawals() {
    return new Withdrawals(Serene.prisma().withdrawal);
  }
  public static messages() {
    return new Messages(Serene.prisma().message);
  }
  public static message() {
    return new Message(Serene.prisma().message);
  }
  public static notifications() {
    return new Notifications(Serene.prisma().notification);
  }
  public static notification() {
    return new Notification(Serene.prisma().notification);
  }
}
