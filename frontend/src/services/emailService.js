const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.emailSender = (deviceID, email, subject, output) => {
  const client_id =
    "934997048531-k4576jlj023aa2cn9j0pj3qr7ekg2293.apps.googleusercontent.com";
  const client_secret = "197QRKkrQ1JCPQNPqxbrcEWT";
  const redirect_uri = "https://developers.google.com/oauthplayground";

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
      deviceID: deviceID,
    },
    "jwtPrivateKey"
  );

  const CLIENT_URL = "http://localhost:3000";

  output = output + `<p>${CLIENT_URL}/forward-email/${token}</p>`;

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
    to: email, // list of receivers
    subject: subject, // Subject line
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
};
