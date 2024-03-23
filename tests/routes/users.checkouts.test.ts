import request from "supertest";
import app from "../../src";
import Haven from "../../src/tool/Haven/Haven";
import Serene from "../../src/prisma/factory/Serene";

describe("users.checkouts route", () => {
  it("GET /users/:userId/checkouts : works", async () => {
    const user = await Serene.prisma().user.findFirst({ where: { id: 1 } });
    const token = await Haven.AccessToken().setUser(user).create();
    const res = await request(app)
      .get("/users/1/checkouts?page=1")
      .set("Authorization", token);
    expect(typeof res.body.data.length).toBe("number");
  });
});
