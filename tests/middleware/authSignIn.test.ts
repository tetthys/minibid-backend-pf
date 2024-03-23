import supertest from "supertest";
import app from "../../src";
import getNewRandomEmail from "./utils/getNewRandomEmail";
import Serene from "../../src/prisma/factory/Serene";

describe("authSignIn", () => {
  it("authSignIn : fill or not", async () => {
    const mockReqBody = {
      email: undefined,
      password: undefined,
    };

    const res = await supertest(app)
      .post("/test/middleware/authSignIn")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
  });
  it("aithSignIn : not existing email", async () => {
    const mockReqBody = {
      email: getNewRandomEmail(),
      password: "password",
    };

    const res = await supertest(app)
      .post("/test/middleware/authSignIn")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
    expect(JSON.parse(res.text)[0].field).toBe("email");
  });
  it("authSignIn : wrong password", async () => {
    const user = await Serene.user().getById(1);
    const mockReqBody = {
      email: user.email,
      password: "wrong_password",
    };

    const res = await supertest(app)
      .post("/test/middleware/authSignIn")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
    expect(JSON.parse(res.text)[0].field).toBe("password");
  });
});
