const express = require("express");
const mongoose = require("mongoose");
const userRegister = require("./routes/register");
const userLogin = require("./routes/login");
const patients = require("./routes/patients");

const app = express();

app.use(express.json());
app.use("/api/register", userRegister);
app.use("/api/login", userLogin);
app.use("/api/patients", patients);

mongoose
  .connect("mongodb://localhost/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("ERROR : ", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on PORT ${port}...`));
