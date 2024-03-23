import supertest from "supertest";
import Serene from "../../src/prisma/factory/Serene";
import Haven from "../../src/tool/Haven/Haven";
import app from "../../src";
import getErrorField from "./utils/getErrorField";
import { get } from "superagent";
import getError from "./utils/getError";

describe("createBidOnProduct", () => {
  it("createBidOnProduct : fill or not", async () => {
    const userKrw = await Serene.user()
      .where({
        currency: "KRW",
      })
      .get();

    const token = await Haven.AccessToken().setUser(userKrw).create();

    const mockReqBody = {
      product_id: undefined,
      bidding_price: undefined,
    };

    const res = await supertest(app)
      .post("/test/middleware/createBidOnProduct")
      .set("Authorization", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
  });
  it("createBidOnProduct : compare with user currency", async () => {
    const userKrw = await Serene.user()
      .where({
        currency: "KRW",
      })
      .get();

    const token = await Haven.AccessToken().setUser(userKrw).create();

    const mockReqBody = {
      product_id: 1,
      bidding_price: 999999, // 999999 KRW is less than 112233.445566 USD which is starting price of test product id
    };

    const res = await supertest(app)
      .post("/test/middleware/createBidOnProduct")
      .set("Authorization", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
  });
  it("createBidOnProduct : can't bid on ended product", async () => {
    const user = await Serene.user()
      .where({
        currency: "USD",
      })
      .get();

    const token = await Haven.AccessToken().setUser(user).create();

    const productEnded = await Serene.prisma().product.create({
      data: {
        userId: 1,
        name: "test",
        shortDescription: "test",
        description: "test",
        startingPrice: 112233.445566,
        endAt: new Date("2021-01-01"),
      },
    });

    const mockReqBody = {
      product_id: Number(productEnded.id),
      bidding_price: 999999,
    };

    const res = await supertest(app)
      .post("/test/middleware/createBidOnProduct")
      .set("Authorization", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
    expect(getError(res).field).toBe("product");
    expect(getError(res).message).toBe('"product" is already ended');
  });
});
