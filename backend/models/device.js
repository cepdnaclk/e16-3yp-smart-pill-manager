const mongoose = require("mongoose");
const Joi = require("joi");

const deviceSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});

const Device = mongoose.model("Device", deviceSchema);

function validateDevice(device) {
  const schema = Joi.object({
    deviceID: Joi.string().required().min(2).max(50),
  });
  return schema.validate(device);
}

module.exports.Device = Device;
module.exports.validateDevice = validateDevice;
