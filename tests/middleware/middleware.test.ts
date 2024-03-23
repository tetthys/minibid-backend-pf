import supertest from "supertest";
import app from "../../src";

describe("middleware", () => {
  it("test", async () => {
    await supertest(app).get("/test/middleware").expect(200);
  });
});
