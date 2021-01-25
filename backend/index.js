const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const app = express();

const userRegister = require("./routes/register");
const userLogin = require("./routes/login");
const patients = require("./routes/patients");
const containers = require("./routes/containers");

app.use(cors());
app.use(express.json());
app.use("/api/register", userRegister);
app.use("/api/login", userLogin);
app.use("/api/patients", patients);
app.use("/api/container", containers);

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("ERROR : ", err));

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on PORT ${port}...`));
