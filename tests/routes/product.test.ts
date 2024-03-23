import request from "supertest";
import app from "../../src";
import Haven from "../../src/tool/Haven/Haven";
import Serene from "../../src/prisma/factory/Serene";

const aWeekLater = () => {
  return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
};

describe("general product route", () => {
  it("GET /products : returns 15 products", async () => {
    const res = await request(app).get("/products?page=1");
    expect(res.body.data.length).toBe(15);
  });
  it("GET /products/1 : returns product with id 1", async () => {
    const res = await request(app).get("/products/1");
    expect(Number(res.body.id)).toBe(1);
  });
  it(`POST /products : 200 : create new product with valid body`, async () => {
    const startingPrice = 100000;

    const user = await Serene.user().getById(1);
    const userToken = await Haven.AccessToken().setUser(user).create();

    const res = await request(app)
      .post("/products")
      .set("Authorization", `${userToken}`)
      .send({
        name: "test product name",
        short_description: "test product short description",
        description: "test product description",
        starting_price: startingPrice,
        end_at: aWeekLater().toISOString(),
        categories: [1, 2, 3, 4, 5],
        product_images: ["1", "2", "3"],
      });

    expect(res.status).toBe(200);
  });
  it(`PUT /products/1 : 200 : update product with valid body`, async () => {
    const startingPrice = 100000;
    const product = await Serene.prisma().product.findFirstOrThrow({
      where: { id: 1 },
      include: {
        user: true,
      },
    });

    const seller = product.user;
    const sellerToken = await Haven.AccessToken().setUser(seller).create();

    const res = await request(app)
      .put("/products/1")
      .set("Authorization", `${sellerToken}`)
      .send({
        name: "updated test product name",
        short_description: "updated test product short description",
        description: "updated test product description",
        starting_price: startingPrice,
        end_at: aWeekLater().toISOString(),
        categories: [1, 2, 3, 4, 5],
        product_images: ["1", "2", "3"],
      });

    expect(res.status).toBe(200);
  });
});
