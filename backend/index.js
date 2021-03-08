const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const app = express();

const userRegister = require("./routes/register");
const userLogin = require("./routes/login");
const patients = require("./routes/patients");
const containers = require("./routes/containers");
const activate = require("./routes/activation");
const forgetPassword = require("./routes/forgetpassword");
const changePassword = require("./routes/changepassword");
const history = require("./routes/history");

app.use(cors());
app.use(express.json());
app.use("/api/register", userRegister);
app.use("/api/login", userLogin);
app.use("/api/patients", patients);
app.use("/api/container", containers);
app.use("/api/activate", activate);
app.use("/api/forgetpassword", forgetPassword);
app.use("/api/changepassword", changePassword);
app.use("/api/history", history);

const db = config.get("db");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected to ${db}...`))
  .catch((err) => console.log("ERROR : ", err));

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on PORT ${port}...`));
