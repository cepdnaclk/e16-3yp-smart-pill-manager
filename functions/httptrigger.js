const mqtt = require("mqtt");
const mongoose = require("mongoose");

const client = mqtt.connect("mqtts://13.89.39.152", {
  ca: "ca.crt",
  rejectUnauthorized: false,
});

// const device_id = topic.slice(11);

const userSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 60,
  },

  patients: {
    type: [],
  },

  containers: {
    type: [],
  },

  history: {
    type: [],
  },

  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },

  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("user", userSchema);

const uri =
  "mongodb+srv://spm-user:1234@cluster0.pps0b.mongodb.net/spmdb?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) => context.log("ERROR : ", err));

async function publisher(device_id) {
  try {
    var user = await User.findOne({ deviceID: device_id });
    const patients = user["patients"];
    const newPatients = patients.map((patient) => ({
      _id: patient._id,
      name: patient.name,
    }));

    const containers = user["containers"];
    const newContainers = containers.map((c) => ({
      patientId: c.patientID,
      containerID: c.containerID,
      startDate: c.startDate,
      medicine: c.medicine,
      endDate: c.endDate,
      routine: c.routine,
      noOfPills: c.noOfPills,
    }));

    const document = {
      containers: newContainers,
      patients: newPatients,
    };

    const topic = `spm/device/${device_id}`;
    var data = JSON.stringify(document);

    client.publish(topic, data, { retain: true }, () => {
      context.log("published message");
    });
  } catch (error) {}
}

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const name = req.query.name || (req.body && req.body.name);
  publisher(name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Request-Headers": "X-Custom-Header",
    },
  };
};
