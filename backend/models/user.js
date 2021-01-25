const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { patientSchema } = require("./patient");
const { containerSchema } = require("./container");

const userSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 60,
  },

  patients: {
    type: [patientSchema],
  },

  containers: {
    type: [containerSchema],
  },

  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ deviceID: this.deviceID, username: this.username, email:this.email }, "jwtPrivateKey");
  return token;
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    deviceID: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().min(5).max(60).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
