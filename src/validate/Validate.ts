import authRegister from "./middleware/authRegister";
import authSignIn from "./middleware/authSignIn";
import createBidOnProduct from "./middleware/createBidOnProduct";
import createNewProduct from "./middleware/createNewProduct";
import createUserBankAccount from "./middleware/createUserBankAccount";
import createUserCard from "./middleware/createUserCard";
import updateProduct from "./middleware/updateProduct";

export default class Validate {
  public static authRegister = authRegister;
  public static authSignIn = authSignIn;
  public static createBidOnProduct = createBidOnProduct;
  public static createNewProduct = createNewProduct;
  public static updateProduct = updateProduct;
  public static createUserCard = createUserCard;
  public static createUserBankAccount = createUserBankAccount;
}
