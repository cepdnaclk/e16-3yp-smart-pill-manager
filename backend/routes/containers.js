const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const auth = require("../middleware/authorization");
const { User } = require("../models/user");
const { Container, validateContainer } = require("../models/container");
const { validateRoutine, Routine } = require("../models/routine");

router.get("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");

  const user = await User.findOne({ deviceID: decoded.deviceID });

  res.send(user.containers);
});

router.post("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");

  let { error } = validateContainer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const routineArray = [];
  const routine = req.body.routine;
  for (let i = 0; i < routine.length; i++) {
    const routeError = validateRoutine(routine[i]);
    if (routeError.error)
      return res.status(400).send(routeError.error.details[0].message);

    let r = new Routine({
      time: routine[i].time,
      pills: routine[i].pills,
    });

    routineArray.push(r);
  }

  const user = await User.findOne({ deviceID: decoded.deviceID });
  const con = user.containers;
  const cont = con.find((o) => o.containerID === req.body.containerID);
  if (cont) return res.status(400).send("Container already fulled.");

  const container = new Container({
    patientID: req.body.patientID,
    containerID: req.body.containerID,
    isFull: req.body.isFull,
    startDate: req.body.startDate,
    medicine: req.body.medicine,
    endDate: req.body.endDate,
    routine: routineArray,
    noOfPills: req.body.noOfPills,
  });

  await User.findOneAndUpdate(
    { deviceID: decoded.deviceID },
    { $push: { containers: container } },
    { new: true }
  );

  return res.send("container added successfully...");
});

router.delete("/:id", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "jwtPrivateKey");

  let user = await User.findOne({ email: decoded.email });

  let containers = user.containers;
  const contianer = containers.find((c) => c._id == req.params.id);

  if (!contianer)
    return res.status(404).send("The genre with the given ID was not found.");

  await User.updateOne(
    {
      deviceID: decoded.deviceID,
      "containers._id": req.params.id,
    },
    {
      $pull: {
        containers: { _id: req.params.id },
      },
    }
  );

  res.send(`deleted ${req.params.id}`);
});

module.exports = router;
