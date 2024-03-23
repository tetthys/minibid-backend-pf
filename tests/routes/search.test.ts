import request from "supertest";
import app from "../../src";

describe("search", () => {
  it("GET /search", async () => {
    const name = "product";
    const res = await request(app).get("/search?name=" + name + "&page=1");
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(15);
  });
});
