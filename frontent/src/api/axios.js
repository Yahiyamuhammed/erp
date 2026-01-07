
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:50001/api",
  withCredentials: true,
});

export default api;
