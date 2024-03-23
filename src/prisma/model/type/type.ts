export type RelationModel =
  | "User"
  | "AccessToken"
  | "Product"
  | "ProductImage"
  | "Checkout"
  | "Bid"
  | "Notification"
  | "Message"
  | "Category"
  | "ProductCategory"
  | "Card"
  | "BankAccount"
  | "Withdrawal";

export interface WithColumnType {}

export interface ProductWithColumnType extends WithColumnType {
  countOfUserBidding?: boolean;
  highestBiddingPrice?: boolean;
}

export interface UserWithColumnType extends WithColumnType {
  countOfUserBought?: boolean;
  countOfUserSold?: boolean;
  sumOfUserBought?: boolean;
  sumOfUserSold?: boolean;
  countOfBidding?: boolean;
  creditLevel?: boolean;
}
