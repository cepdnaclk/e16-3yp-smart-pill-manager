const mongoose = require("mongoose");
const Joi = require("joi");
const { routineSchema, validateRoutine } = require("./routine");

const containerSchema = new mongoose.Schema({
  containerID: Number,
  patientID: String,
  medicine: String,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  routine: { type: [routineSchema] },
  noOfPills: Number,
  isFull: Boolean,
});

const Container = mongoose.model("Container", containerSchema);

function validateContainer(container) {
  const schema = Joi.object({
    containerID: Joi.number().min(1).max(12).required(),
    patientID: Joi.string().required().min(2).max(50),
    medicine: Joi.string().required(),
    startDate:Joi.date(),
    endDate: Joi.date().required(),
    routine: Joi.array().max(3),
    noOfPills: Joi.number(),
    isFull: Joi.bool(),
  });
  return schema.validate(container);
}

module.exports.containerSchema = containerSchema;
module.exports.Container = Container;
module.exports.validateContainer = validateContainer;
