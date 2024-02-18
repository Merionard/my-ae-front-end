import axios from "axios";
import { getAuthToken } from "./hooks";

export const customFetchClient = axios.create({
  baseURL: "http://localhost:8080",
});

customFetchClient.interceptors.request.use(
  async (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customFetchClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login/unauthorized";
    } else {
      throw error;
    }
  }
);
