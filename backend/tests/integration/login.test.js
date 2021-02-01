const { User } = require("../../models/user");
const request = require("supertest");

let server;

describe("User login", () => {
  beforeEach(async () => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
  });

  it("should return 400 status if error of validation data is occured", async () => {
    const userData = {
      email: "newdomain.com",
      password: "123",
    };

    const res = await request(server).post("/api/login/").send(userData);
    expect(res.status).toBe(400);
  });
  it("should return 400 status because of invalid password", async () => {
    const userData = {
      email: "new@domain.com",
      password: "12345676",
    };

    const res = await request(server).post("/api/login/").send(userData);
    expect(res.status).toBe(400);
  });

  it("should return 200 if it is valid user", async () => {
    const userData = {
      email: "new@domain.com",
      password: "123456",
    };

    const res = await request(server).post("/api/login/").send(userData);
    expect(res.status).toBe(200);
  });
});
