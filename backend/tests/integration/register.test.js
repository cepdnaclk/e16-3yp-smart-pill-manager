const { User } = require("../../models/user");
const request = require("supertest");

let server;

describe("User register", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });

  it("should return 400 status if error of validation data is occured", async () => {
    const userData = {
      deviceID: "123456",
      email: "new@domain",
      username: "myusername",
      password: "123",
    };

    const res = await request(server).post("/api/register/").send(userData);
    expect(res.status).toBe(400);
  });

  it("should return 400 status if invalid device ID", async () => {
    const userData = {
      deviceID: "12345678910",
      email: "new2@domain.com",
      username: "aruna",
      password: "123456",
    };

    const res = await request(server).post("/api/register/").send(userData);
    expect(res.status).toBe(400);
  });

  it("should return 400 status if device already registered", async () => {
    const userData = {
      deviceID: "123456",
      email: "new@domain.com",
      username: "arunanuwantha",
      password: "12345",
    };

    const res = await request(server).post("/api/register/").send(userData);
    expect(res.status).toBe(400);
  });

  it("should return 200 if it is valid user", async () => {
    const userData = {
      deviceID: "12345678",
      username: "register",
      email: "register@domain.com",
      password: "12345",
    };

    const res = await request(server).post("/api/register/").send(userData);
    expect(res.status).toBe(200);
    await User.remove({ deviceID: "12345678" });
  });
});
