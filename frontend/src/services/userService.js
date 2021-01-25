import axios from "axios";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

export function register(user) {
  return axios.post(endPoint + "/register", {
    deviceID: user.deviceID,
    email: user.email,
    username: user.username,
    password: user.password,
  });
}

export function login(email, password) {
  return axios.post(endPoint + "/login", {
    email: email,
    password: password,
  });
}
