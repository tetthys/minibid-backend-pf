import app from "../../../src";
import getError from "../../middleware/utils/getError";
import Serene from "../../../src/prisma/factory/Serene";
import Haven from "../../../src/tool/Haven/Haven";
import request from "supertest";

/**
 * guest : no token at all
 * user : token (user)
 * admin : token (user + admin)
 */

describe("Auth", () => {
  it("guest -> allow user", async () => {
    const res = await request(app).get("/test/authcase/user").send();

    expect(res.status).toBe(400);
    expect(getError(res).message).toBe("Token is undefined");
  });
  it("guest -> allow admin", async () => {
    const res = await request(app).get("/test/authcase/admin").send();

    expect(res.status).toBe(400);
    expect(getError(res).message).toBe("Token is undefined");
  });
  it("user -> allow user", async () => {
    const user = await Serene.user().get();
    const userToken = await Haven.AccessToken().setUser(user).create();

    const res = await request(app)
      .get("/test/authcase/user")
      .set("Authorization", `${userToken}`)
      .send();

    expect(res.status).toBe(200);
  });
  it("user -> allow admin", async () => {
    const user = await Serene.user().get();
    const userToken = await Haven.AccessToken().setUser(user).create();

    const res = await request(app)
      .get("/test/authcase/admin")
      .set("Authorization", `${userToken}`)
      .send();

    expect(res.status).toBe(400);
    expect(getError(res).message).toBe("You are not a admin");
  });
  it("user with id 1 -> user/userId/2", async () => {
    const userHavingId1 = await Serene.user().where({ id: 1 }).get();
    const userHavingId1Token = await Haven.AccessToken()
      .setUser(userHavingId1)
      .create();

    const res = await request(app)
      .get("/test/authcase/user/userId/2")
      .set("Authorization", `${userHavingId1Token}`)
      .send();

    expect(res.status).toBe(400);
    expect(getError(res).message).toBe("You can't access other user's data");
  });
  it("user with id 2 -> user/userId/2", async () => {
    const userHavingId2 = await Serene.user().where({ id: 2 }).get();
    const userHavingId2Token = await Haven.AccessToken()
      .setUser(userHavingId2)
      .create();

    const res = await request(app)
      .get("/test/authcase/user/userId/2")
      .set("Authorization", `${userHavingId2Token}`)
      .send();

    expect(res.status).toBe(200);
  });
  it("username : user0 -> user/username/user1", async () => {
    const user0 = await Serene.user().where({ id: 1 }).get();
    const user0Token = await Haven.AccessToken().setUser(user0).create();

    const res = await request(app)
      .get("/test/authcase/user/username/user1")
      .set("Authorization", `${user0Token}`)
      .send();

    expect(res.status).toBe(400);
    expect(getError(res).message).toBe("You can't access other user's data");
  });
  it("username : user1 -> user/username/user1", async () => {
    const user1 = await Serene.user().where({ id: 2 }).get();
    const user1Token = await Haven.AccessToken().setUser(user1).create();

    const res = await request(app)
      .get("/test/authcase/user/username/user1")
      .set("Authorization", `${user1Token}`)
      .send();

    expect(res.status).toBe(200);
  });
  it("seller : seller -> /product/:productId", async () => {
    const product = await Serene.prisma().product.findFirstOrThrow({
      where: { id: 1 },
      include: { user: true },
    });

    const seller = product.user;
    const sellerToken = await Haven.AccessToken().setUser(seller).create();

    const res = await request(app)
      .get(`/test/authcase/product/${product.id}`)
      .set("Authorization", `${sellerToken}`)
      .send();

    expect(res.status).toBe(200);
  });
  it("seller : other -> /product/:productId", async () => {
    const product = await Serene.prisma().product.findFirstOrThrow({
      where: { id: 1 },
      include: { user: true },
    });

    const other = await Serene.prisma().user.findFirstOrThrow({
      where: { id: product.user.id + BigInt(1) },
    });
    const otherToken = await Haven.AccessToken().setUser(other).create();

    const res = await request(app)
      .get(`/test/authcase/product/${product.id}`)
      .set("Authorization", `${otherToken}`)
      .send();

    expect(res.status).toBe(400);
  });
});
