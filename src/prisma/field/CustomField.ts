type Id = number | bigint;

export default abstract class CustomField {
  abstract get(id: Id): Promise<any>;

  abstract getType(): string;
}
