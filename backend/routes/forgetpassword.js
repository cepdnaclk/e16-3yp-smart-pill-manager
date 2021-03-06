const { User } = require("../models/user");
const { Device } = require("../models/device");
const express = require("express");
const { emailSender } = require("../middleware/emailSender");

const router = express.Router();

router.post("/", async (req, res) => {
  res.header["Access-Control-Allow-Origin"] = "*";

  try {
    let device = await Device.findOne({
      deviceID: req.body.deviceID,
    });
    if (!device) return res.status(400).send("Invalid DeviceID.");
    let user = await User.findOne({
      deviceID: req.body.deviceID,
    });

    if (!user)
      return res.status(400).send("You haven't account from this device ID");

    const device_id = req.body.deviceID;

    emailSender(device_id, "eng.isurulakshan@gmail.com");
    res.send(`Sent email to ${user.email}`);
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
