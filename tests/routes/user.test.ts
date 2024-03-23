import request from "supertest";
import app from "../../src";
import strToNumber from "../../src/helper/strToNumber/strToNumber";

describe("general user route", () => {
  it("GET /users : returns 15 users", async () => {
    const res = await request(app).get("/users?page=1");
    expect(res.body.data.length).toBe(15);
  });
  it("GET /users/3 : returns user with id 3", async () => {
    const res = await request(app).get("/users/3");
    expect(strToNumber(res.body.id)).toBe(3);
  });
});
