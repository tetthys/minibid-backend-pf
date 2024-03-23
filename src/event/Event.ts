import CustomEvent from "./base/CustomEvent";

export default class Event {
  static occur(event: CustomEvent) {
    event.occur();
  }
}
