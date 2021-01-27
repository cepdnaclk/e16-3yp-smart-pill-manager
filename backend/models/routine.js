const mongoose = require("mongoose");
const Joi = require("joi");

const routineSchema = new mongoose.Schema({
  time: Number,
  pills: Number,
});

const Routine = mongoose.model("Routine", routineSchema);

function validateRoutine(routine) {
  const schema = Joi.object({
    time: Joi.string().required().label("routine time"),
    pills: Joi.number().min(0).label("number of pills"),
  });
  return schema.validate(routine);
}

module.exports.routineSchema = routineSchema;
module.exports.Routine = Routine;
module.exports.validateRoutine = validateRoutine;
