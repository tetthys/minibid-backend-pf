import Subject from "../Subject";
import Observer from "../Observer";

export default class Weather implements Subject {
  private observers: Observer[] = [];

  public register(o: Observer): void {
    this.observers.push(o);
  }

  public remove(o: Observer): void {
    this.observers = this.observers.filter((observer) => observer !== o);
  }

  public notify(): void {
    const temperature = this.getTemperature();
    const humidity = this.getHumidity();
    const pressure = this.getPressure();

    this.observers.forEach((observer) =>
      observer.update(temperature, humidity, pressure)
    );
  }

  private getTemperature(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  private getHumidity(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  private getPressure(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  public measurementsChanged(): void {
    this.notify();
  }
}
