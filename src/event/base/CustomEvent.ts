export default abstract class CustomEvent {
  abstract from(param?: any): this;

  abstract to(param?: any): this;

  abstract for(param?: any): this;

  abstract occur(): Promise<void>;

  abstract business(): Promise<void>;

  abstract notifyToDB(): Promise<void>;

  abstract push(): Promise<void>;
}
