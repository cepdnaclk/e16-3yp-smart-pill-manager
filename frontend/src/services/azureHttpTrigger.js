const https = require("https");

export function httpTrigger(deviceID) {
  const options = {
    hostname: "spm-functionapp.azurewebsites.net",
    port: 443,
    path: `/api/HttpTrigger2?name=${deviceID}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    console.log("statusCode:", res.statusCode);
    console.log("headers:", res.headers);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });
  req.end();
}
