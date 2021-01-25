const { User } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user) return res.status(400).send("Invalid email or password!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password!");

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(token);
  } catch (ex) {
    console.log(ex);
  }
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(60).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

module.exports = router;
