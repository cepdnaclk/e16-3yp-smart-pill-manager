import axios from "axios";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

export function getContainers() {
  return axios.get(endPoint + "/container");
}

export function addContainer(containerData) {
  return axios.post(endPoint + "/container", containerData);
}

export function deleteContainer(id) {
  return axios.delete(endPoint + "/container/" + id);
}
