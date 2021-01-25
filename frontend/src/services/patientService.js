import axios from "axios";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

export function getPatients() {
  return axios.get(endPoint + "/patients");
}

export function addPatients(name, age) {
  return axios.post(endPoint + "/patients", { name: name, age: age });
}

export function deletePatient(id) {
  return axios.delete(endPoint + "/patients/" + id);
}

export function updatePatient(id, name, age) {
  return axios.put(endPoint + "/patients/" + id, { name: name, age: age });
}
