import axios from "axios";
import { sign } from "jsonwebtoken";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

export function accountVerify(device_id) {
  const token = sign(
    {
      deviceID: device_id,
    },
    "jwtPrivateKey"
  );

  return axios.post(endPoint + `/activate/${token}`, {});
}
