const { User } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.put("/:token", async (req, res) => {
  const decoded = jwt.verify(req.params.token, "jwtPrivateKey");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  await User.updateOne(
    {
      deviceID: decoded.deviceID,
    },
    {
      $set: {
        password: hashPassword,
      },
    }
  );

  res.send("Password is changed.");
});

module.exports = router;
