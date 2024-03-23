export default abstract class Beverage {
  protected description: string = "Unknown Beverage";

  public getDescription(): string {
    return this.description;
  }

  public abstract cost(): number;
}
