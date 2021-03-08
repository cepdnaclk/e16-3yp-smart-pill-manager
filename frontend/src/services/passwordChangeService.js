import axios from "axios";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

export function checkDeviceIDAndEmail(device_id, email) {
  return axios.post(endPoint + "/forgetpassword", {
    deviceID: device_id,
    email: email,
  });
}

export function changePassword(token, password, cpassword) {
  return axios.put(endPoint + `/changepassword/${token}`, {
    password: password,
    cpassword: cpassword,
  });
}
