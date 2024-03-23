import supertest from "supertest";
import app from "../../src";
import getErrorField from "./utils/getErrorField";
import getError from "./utils/getError";

interface ReqBodyTest {
  name: string | undefined;
  starting_price: number | undefined;
  short_description: string | undefined;
  end_at: string | undefined;
  description: string | undefined;
  categories: number[] | undefined;
  productImages: string[] | undefined;
}

const productImageUrl = "https://via.placeholder.com/150";

describe("createNewProduct", () => {
  it("fill or not", async () => {
    const mockReqBody: ReqBodyTest = {
      name: undefined,
      starting_price: undefined,
      short_description: undefined,
      end_at: undefined,
      description: undefined,
      categories: undefined,
      productImages: undefined,
    };

    const res = await supertest(app)
      .post("/test/middleware/createNewProduct")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
  });
  it("return 200 if categories.length is 0", async () => {
    const mockReqBody: ReqBodyTest = {
      name: "test name",
      starting_price: 123456.123456,
      short_description: "test short description",
      end_at: new Date().toISOString(),
      description: "test description",
      categories: [],
      productImages: [productImageUrl, productImageUrl, productImageUrl],
    };

    const res = await supertest(app)
      .post("/test/middleware/createNewProduct")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(200);
  });
  it("categories undefined", async () => {
    const mockReqBody: ReqBodyTest = {
      name: "test name",
      starting_price: 123456.123456,
      short_description: "test short description",
      end_at: new Date().toISOString(),
      description: "test description",
      categories: undefined,
      productImages: [productImageUrl, productImageUrl, productImageUrl],
    };

    const res = await supertest(app)
      .post("/test/middleware/createNewProduct")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
    expect(getErrorField(res)).toBe("categories");
  });
  it("filter invalid category id", async () => {
    const mockReqBody: ReqBodyTest = {
      name: "test name",
      starting_price: 123456.123456,
      short_description: "test short description",
      end_at: new Date().toISOString(),
      description: "test description",
      categories: [0, 1, 99999999], // 99999999 is invalid category id
      productImages: [productImageUrl, productImageUrl, productImageUrl],
    };

    const res = await supertest(app)
      .post("/test/middleware/createNewProduct")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
    expect(getErrorField(res)).toBe("category");
  });
  it("filter duplicate category id", async () => {
    const mockReqBody: ReqBodyTest = {
      name: "test name",
      starting_price: 123456.123456,
      short_description: "test short description",
      end_at: new Date().toISOString(),
      description: "test description",
      categories: [0, 1, 1],
      productImages: [productImageUrl, productImageUrl, productImageUrl],
    };

    const res = await supertest(app)
      .post("/test/middleware/createNewProduct")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    /**
     * categories[0], categories[1], categories[2]
     */

    expect(res.status).toBe(400);
    expect(getErrorField(res)).toContain("categories");
  });
});
