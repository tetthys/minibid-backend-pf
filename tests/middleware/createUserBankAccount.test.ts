import Haven from "../../src/tool/Haven/Haven";
import app from "../../src";
import request from "supertest";
import getError from "./utils/getError";
import Serene from "../../src/prisma/factory/Serene";

describe("createUserBankAccount", () => {
  beforeEach(async () => {
    await Serene.prisma().user.update({
      where: {
        id: 1,
      },
      data: {
        bankAccount: {
          create: {
            info: "1234",
          },
        },
      },
    });
  });
  afterEach(async () => {
    await Serene.prisma().user.update({
      where: {
        id: 1,
      },
      data: {
        bankAccount: {
          delete: true,
        },
      },
    });
  });
  it("user already have a bank account can't access", async () => {
    const token = await Haven.AccessToken()
      .setUser({
        id: 1,
      })
      .create();

    const res = await request(app)
      .post("/test/middleware/createUserBankAccount")
      .set("Authorization", `${token}`)
      .send({
        info: "1234",
      });

    expect(res.status).toBe(400);
    expect(getError(res).message).toBe("User already have a bank account");
  });
});
