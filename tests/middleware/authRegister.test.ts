import supertest from "supertest";
import app from "../../src";
import Serene from "../../src/prisma/factory/Serene";
import getNewRandomEmail from "./utils/getNewRandomEmail";
import getNewRandomUsername from "./utils/getNewRandomUsername";

describe("authRegister", () => {
  it("authRegister : fill or not", async () => {
    const mockReqBody = {
      email: undefined,
      email_code: undefined,
      username: undefined,
      phone_number: undefined,
      phone_number_code: undefined,
      currency: undefined,
      date_of_birth: undefined,
      password: undefined,
      confirm_password: undefined,
    };

    const res = await supertest(app)
      .post("/test/middleware/authRegister")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
  });
  it("authRegister : filter currency", async () => {
    const mockReqBody = {
      email: "test@gmail.com",
      email_code: "123456",
      username: "testuser",
      phone_number: "01012345678",
      phone_number_code: "123456",
      currency: "wrong_currency",
      date_of_birth: new Date().toISOString(),
      password: "password1234",
      confirm_password: "password1234",
    };

    const res = await supertest(app)
      .post("/test/middleware/authRegister")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
    expect(JSON.parse(res.text)[0].field).toBe("currency");
  });
  it("authRegister : existing email", async () => {
    // create a test user
    const testUsername = getNewRandomUsername();
    const testEmail = getNewRandomEmail();

    const alreadyCreatedUser = await Serene.prisma().user.create({
      data: {
        username: testUsername,
        dateOfBirth: new Date(),
        phoneNumber: "01012345687",
        password: "password",
        currency: "USD",
        email: testEmail,
      },
    });

    const mockReqBody = {
      email: alreadyCreatedUser.email,
      email_code: "123456",
      username: getNewRandomUsername(),
      phone_number: "01012345678",
      phone_number_code: "123456",
      currency: "KRW",
      date_of_birth: new Date().toISOString(),
      password: "password1234",
      confirm_password: "password1234",
    };

    const res = await supertest(app)
      .post("/test/middleware/authRegister")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
    expect(JSON.parse(res.text)[0].field).toBe("email");
  });
  it("authRegister : existing username", async () => {
    // create a test user
    const testUsername = getNewRandomUsername();
    const testEmail = getNewRandomEmail();

    const alreadyCreatedUser = await Serene.prisma().user.create({
      data: {
        username: testUsername,
        dateOfBirth: new Date(),
        phoneNumber: "01012345687",
        password: "password",
        currency: "USD",
        email: testEmail,
      },
    });

    const mockReqBody = {
      email: getNewRandomEmail(),
      email_code: "123456",
      username: alreadyCreatedUser.username,
      phone_number: "01012345678",
      phone_number_code: "123456",
      currency: "KRW",
      date_of_birth: new Date().toISOString(),
      password: "password1234",
      confirm_password: "password1234",
    };

    const res = await supertest(app)
      .post("/test/middleware/authRegister")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockReqBody);

    expect(res.status).toBe(400);
    expect(JSON.parse(res.text)[0].field).toBe("username");
  });
});
