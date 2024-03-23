import Beverage from "./Beverage";

export default abstract class CondimentDecorator extends Beverage {
  protected beverage: Beverage = {} as Beverage;

  public abstract getDescription(): string;
}
