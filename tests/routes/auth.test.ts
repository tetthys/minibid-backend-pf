import request from "supertest";
import app from "../../src";

const uniqueUsername = "JasonDerolo" + Math.floor(Math.random() * 1000000);
const uniqueEmail = uniqueUsername + "@gmail.com";
const correctPassword = "@@password1234@@";
const wrongPassword = "@@wrongPassword1234@@";

describe("auth route", () => {
  it("POST /register : work", async () => {
    const data = {
      username: uniqueUsername,
      phone_number: "010-1234-5678",
      phone_number_code: "123456",
      date_of_birth: "2000-01-01",
      password: correctPassword,
      confirm_password: correctPassword,
      currency: "KRW",
      email: uniqueEmail,
      email_code: "123456",
    };
    const res = await request(app).post("/auth/register").send(data);
    expect(res.status).toBe(201);
  });
  it("POST /sign-in : work with correct password", async () => {
    const data = {
      email: uniqueEmail,
      password: correctPassword,
    };
    const res = await request(app).post("/auth/sign-in").send(data);
    expect(res.status).toBe(200);
    expect(res.body.access_token).toBeTruthy();
  });
  it("POST /sign-in : doesn't work with wrong password", async () => {
    const data = {
      email: uniqueEmail,
      password: wrongPassword,
    };
    const res = await request(app).post("/auth/sign-in").send(data);
    expect(res.status).toBe(400);
    expect(res.body.access_token).not.toBeTruthy();
  });
});
