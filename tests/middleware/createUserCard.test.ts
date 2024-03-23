import app from "../../src";
import Serene from "../../src/prisma/factory/Serene";
import request from "supertest";
import Haven from "../../src/tool/Haven/Haven";
import getError from "./utils/getError";

describe("createUserCard", () => {
  beforeEach(async () => {
    await Serene.prisma().user.update({
      where: {
        id: 1,
      },
      data: {
        card: {
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
        card: {
          delete: true,
        },
      },
    });
  });
  it("user already have a card can't access", async () => {
    const token = await Haven.AccessToken()
      .setUser({
        id: 1,
      })
      .create();

    const res = await request(app)
      .post("/test/middleware/createUserCard")
      .set("Authorization", `${token}`)
      .send({
        info: "1234",
      });

    expect(res.status).toBe(400);
    expect(getError(res).message).toBe("User already have a card");
  });
});
