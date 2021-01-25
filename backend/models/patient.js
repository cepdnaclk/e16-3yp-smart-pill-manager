const mongoose = require("mongoose");
const Joi = require("joi");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  age: { type: Number },
});

const Patient = mongoose.model("Patient", patientSchema);

function validatePatient(patient) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    age: Joi.number().min(1).max(120),
  });
  return schema.validate(patient);
}

module.exports.patientSchema = patientSchema;
module.exports.Patient = Patient;
module.exports.validatePatient = validatePatient;
