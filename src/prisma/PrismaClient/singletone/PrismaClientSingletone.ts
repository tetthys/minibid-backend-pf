import { PrismaClient } from "@prisma/client";

export default class PrismaClientSingletone {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaClientSingletone.instance) {
      PrismaClientSingletone.instance = new PrismaClient();
    }
    return PrismaClientSingletone.instance;
  }
}
