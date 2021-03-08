const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const auth = require("../middleware/authorization");
const { User } = require("../models/user");

router.get("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");

  const user = await User.findOne({ deviceID: decoded.deviceID });

  res.send(user.history);
});

module.exports = router;
