import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8082",
  // baseURL: ' http://10.255.119.105:8082',
  timeout: 3000,
});

export default instance;
