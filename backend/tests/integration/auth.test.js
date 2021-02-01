const request = require("supertest");
const { User } = require("../../models/user");
let server;

describe("Auth Middleware", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => server.close());

  let token;

  const execute = () => {
    return request(server)
      .post("/api/patients")
      .set("x-auth-token", token)
      .send({ name: "patient name", age: 23 });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";

    const res = await execute();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "invalid token";
    const res = await execute();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await execute();
    expect(res.status).toBe(200);
  });
});
