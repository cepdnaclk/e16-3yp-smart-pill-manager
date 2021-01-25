const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const auth = require("../middleware/authorization");
const { User } = require("../models/user");
const { Patient, validatePatient } = require("../models/patient");

router.get("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");
  user = await User.findOne({ email: decoded.email });
  res.send(user.patients);
});

router.post("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");

  const { error } = validatePatient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const patient = new Patient({
    name: req.body.name,
    age: req.body.age,
  });

  let user = await User.findOneAndUpdate(
    { deviceID: decoded.deviceID },
    { $push: { patients: patient } },
    { new: true }
  );

  return res.send("Patient added successfully...");
});

//update delete
router.put("/:id", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");

  const { error } = validatePatient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: decoded.email });

  let patients = user.patients;
  const patient = patients.find((p) => p._id == req.params.id);

  if (!patient)
    return res.status(404).send("The genre with the given ID was not found.");

  await User.updateOne(
    { deviceID: decoded.deviceID, "patients._id": req.params.id },
    {
      $set: {
        "patients.$.name": req.body.name,
        "patients.$.age": req.body.age,
      },
    }
  );
  res.send("updated successfully");
});

router.delete("/:id", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");

  let user = await User.findOne({ email: decoded.email });

  let patients = user.patients;
  const patient = patients.find((p) => p._id == req.params.id);

  if (!patient)
    return res.status(404).send("The genre with the given ID was not found.");

  await User.updateOne(
    {
      deviceID: decoded.deviceID,
      "patients._id": req.params.id,
    },
    {
      $pull: {
        patients: { _id: req.params.id },
      },
    }
  );

  res.send(`deleted ${req.params.id}`);
});

router.get("/:id", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");

  let user = await User.findOne({ email: decoded.email });

  let patients = user.patients;
  const patient = patients.find((p) => p._id == req.params.id);

  res.send(patient);
});

module.exports = router;
