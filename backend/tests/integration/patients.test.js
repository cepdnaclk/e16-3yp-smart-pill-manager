const request = require("supertest");
const { User } = require("../../models/user");

let server;
let token;

describe("Patients Test", () => {
  beforeEach(async () => {
    server = require("../../index");
    const user = await User.findOne({ deviceID: "123456" });
    token = user.generateAuthToken();
  });
  afterEach(() => server.close());

  describe("POST/", () => {
    it("should return 200 if patient added successfully", async () => {
      const res = await request(server)
        .post("/api/patients/")
        .set("x-auth-token", token)
        .send({ name: "Aruna Nuwantha", age: 23 });
      expect(res.status).toBe(200);
    });
  });

  describe("GET/", () => {
    it("should return 200 if get the patients list correctly", async () => {
      const res = await request(server)
        .get("/api/patients/")
        .set("x-auth-token", token);

      expect(res.status).toBe(200);
    });
  });
});
