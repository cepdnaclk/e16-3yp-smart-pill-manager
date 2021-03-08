import axios from "axios";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

export function accountVerify(token) {
  return axios.get(endPoint + `/activate/${token}`);
}
