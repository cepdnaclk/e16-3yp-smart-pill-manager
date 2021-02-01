const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

describe("User.generateAuthToken", () => {
  it("should return valid json web token", () => {
    const userInfo = {
      deviceID: "12345",
      email: "new@domain.com",
      username: "myname",
    };
    const user = new User(userInfo);
    const token = user.generateAuthToken();
    const decodedValue = jwt.verify(token, "jwtPrivateKey");
    expect(decodedValue).toHaveProperty("deviceID", userInfo.deviceID);
    expect(decodedValue).toHaveProperty("email", userInfo.email);
    expect(decodedValue).toHaveProperty("username", userInfo.username);
  });
});
