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

export function clearHistory() {
  return axios.delete(endPoint + "/history");
}
export function deleteAccount(token) {
  return axios.delete(endPoint + "/register/" + token);
}

export function getHistory() {
  return axios.get(endPoint + "/history");
}
