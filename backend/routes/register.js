const { User, validate } = require("../models/user");
const { Device } = require("../models/device");
const express = require("express");
const bcrypt = require("bcrypt");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");
const router = express.Router();
const jwt = require("jsonwebtoken");

const client_id =
  "934997048531-k4576jlj023aa2cn9j0pj3qr7ekg2293.apps.googleusercontent.com";
const client_secret = "197QRKkrQ1JCPQNPqxbrcEWT";
const redirect_uri = "https://developers.google.com/oauthplayground";

router.post("/", async (req, res) => {
  res.header["Access-Control-Allow-Origin"] = "*";
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let device = await Device.findOne({
      deviceID: req.body.deviceID,
    });
    if (!device) return res.status(400).send("Invalid DeviceID.");
    let user = await User.findOne({
      $or: [{ deviceID: req.body.deviceID }, { email: req.body.email }],
    });

    if (user)
      return res
        .status(400)
        .send("Device already registered or Email already used.");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      deviceID: req.body.deviceID,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    await user.save();

    //////////////////////////////////SEND EMAIL TO USER///////////////////////////////////

    const oauth2Client = new OAuth2(
      client_id, // ClientID
      client_secret, // Client Secret
      redirect_uri // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token:
        "1//04QGuTdDwBF9kCgYIARAAGAQSNwF-L9IrkJmR-9MA5JXA_Tm5jen6YNiSP8JfIx_y8W3P2p5BdQSRCM0KSj2UCGlle_UwM6Pd3X8",
    });
    const accessToken = oauth2Client.getAccessToken();

    const token = jwt.sign(
      {
        deviceID: req.body.deviceID,
      },
      "jwtPrivateKey"
    );

    const CLIENT_URL = "http://" + req.headers.host;

    const output = `
  <h2>Please click on below link to activate your account</h2>
  <p>${CLIENT_URL}/api/activate/${token}</p>
  <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
  `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "no.reply.smartpillmanager@gmail.com",
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken:
          "1//04QGuTdDwBF9kCgYIARAAGAQSNwF-L9IrkJmR-9MA5JXA_Tm5jen6YNiSP8JfIx_y8W3P2p5BdQSRCM0KSj2UCGlle_UwM6Pd3X8",
        accessToken: accessToken,
      },
    });

    // send mail with defined transport object
    const mailOptions = {
      from: '"smartpillmanager" <no.reply.smartpillmanager@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Account Verification: NodeJS Auth ✔", // Subject line
      generateTextFromHTML: true,
      html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail sent : %s", info.response);
      }
    });

    const tokenAuth = user.generateAuthToken();
    res.send(tokenAuth);

    ///////////////////////////////////////////////////////////
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
