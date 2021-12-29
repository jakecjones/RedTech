import axios from "axios";
const API_KEY = "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4";
const BASE_URL = "https://red-candidate-web.azurewebsites.net/api/";

const http = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
      ApiKey: API_KEY,
    },
  });

  return instance;
}

export default {
  http
}
