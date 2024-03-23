import json from "../../helper/json/json";
import Haven from "../Haven/Haven";

type Value = Record<string, any> | string | number | boolean;

export default class Cache {
  private for: string = "";

  async set(key: string, value: Value) {
    switch (this.for) {
      case "forOneMinute":
        await Haven.Redis().setex(key, 60, json(value));
        break;
      case "forOneHour":
        await Haven.Redis().setex(key, 60 * 60, json(value));
        break;
      case "forOneDay":
        await Haven.Redis().setex(key, 60 * 60 * 24, json(value));
        break;
      default:
        await Haven.Redis().set(key, json(value));
    }

    return value;
  }

  async get(key: string, callback?: Function) {
    const value: any = await Haven.Redis().get(key);
    return value === null && callback ? await callback() : JSON.parse(value);
  }

  forOneMinute() {
    this.for = "forOneMinute";
    return this;
  }

  forOneHour() {
    this.for = "forOneHour";
    return this;
  }

  forOneDay() {
    this.for = "forOneDay";
    return this;
  }
}
