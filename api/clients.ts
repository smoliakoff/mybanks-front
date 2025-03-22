import axios from "axios";

const isMock = true

export const BASE_API_PATH = isMock
  ? "http://127.0.0.1:3001"
  : "http://127.0.0.1:3001"

const api = axios.create({
  baseURL: BASE_API_PATH
});

export default api;
