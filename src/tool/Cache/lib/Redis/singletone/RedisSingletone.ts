import { Redis } from "ioredis";
import env from "../../../../../helper/env/env";

export default class RedisSingletone {
  private static instace: Redis;

  public static getInstance() {
    if (!RedisSingletone.instace) {
      RedisSingletone.instace = new Redis({
        port: env("REDIS_PORT"),
        host: env("REDIS_HOST"),
      });
    }
    return RedisSingletone.instace;
  }
}
