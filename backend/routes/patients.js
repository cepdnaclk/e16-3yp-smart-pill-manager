const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const auth = require("../middleware/authorization");
const { User } = require("../models/user");
const { Patient, validatePatient } = require("../models/patient");

router.get("/", auth, (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");
  res.send(decoded);
});

router.post("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");

  const { error } = validatePatient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const patient = new Patient({
    name: req.body.name,
  });

  let user = await User.findOneAndUpdate(
    { deviceId: decoded.deviceId },
    { $push: { patients: patient } },
    { new: true }
  );

  return res.send("working...");
});

module.exports = router;
