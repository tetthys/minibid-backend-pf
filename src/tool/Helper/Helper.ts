import { faker } from "@faker-js/faker";
import env from "../../helper/env/env";
import json from "../../helper/json/json";

export default class Helper {
  public static env(param: string): string {
    return env(param);
  }

  public static json(param: any): string {
    return json(param);
  }

  public static faker() {
    return faker;
  }
}
