const { User, validate } = require("../models/user");
const { Device } = require("../models/device");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
  res.header["Access-Control-Allow-Origin"] = "*";
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let device = await Device.findOne({
      deviceID: req.body.deviceID,
    });
    if (!device) return res.status(400).send("Invalid DeviceID.");
    let user = await User.findOne({
      $or: [{ deviceID: req.body.deviceID }, { email: req.body.email }],
    });

    if (user)
      return res
        .status(400)
        .send("Device already registered or Email already used.");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      deviceID: req.body.deviceID,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    await user.save();
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(token);
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
