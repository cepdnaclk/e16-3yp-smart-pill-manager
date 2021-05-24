const https = require("https");

export function httpTrigger(deviceID) {
  return https.request(
    {
      hostname: "spm-functionapp.azurewebsites.net",
      port: 443,
      path: `/api/HttpTrigger1?name=${deviceID}`,
      method: "GET",
    },
    (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });

      res.on("error", (e) => {
        console.log(e);
      });
      res.end();
    }
  );
}
