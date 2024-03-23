import Observer from "./Observer";

export default interface Subject {
  register(o: Observer): void;
  remove(o: Observer): void;
  notify(): void;
}
