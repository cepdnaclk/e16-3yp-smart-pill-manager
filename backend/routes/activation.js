const { User } = require("../models/user");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/:token", async (req, res) => {
  const decoded = jwt.verify(req.params.token, "jwtPrivateKey");

  await User.updateOne(
    {
      deviceID: decoded.deviceID,
    },
    {
      $set: {
        isVerified: true,
      },
    }
  );

  res.send("Account is Verified successfully...");
});

module.exports = router;
