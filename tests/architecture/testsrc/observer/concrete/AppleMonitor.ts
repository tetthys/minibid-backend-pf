import Observer from "../Observer";

export default class AppleMonitor implements Observer {
  private count: number = 0;

  constructor() {}

  update(temperature: number, humidity: number, pressure: number) {
    this.addUpdateCount();
  }

  addUpdateCount(): void {
    this.count++;
  }

  getUpdateCount(): number {
    return this.count;
  }
}
