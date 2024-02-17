import axios from "axios";
import { getAuthToken } from "./hooks";
import { UrlApi } from "./urlAPI";

type FetchMethod = "GET" | "POST" | "DELETE" | "PUT";
export const client = async <T>(
  urlApi: UrlApi,
  method: FetchMethod,
  returnType: T,
  pathParam?: string,
  body?: unknown,
  errorMsg = "Une erreur est survenue"
) => {
  let fetchParam: RequestInit | undefined = undefined;
  if (method === "POST" || method === "DELETE" || method === "PUT") {
    fetchParam = {
      method: method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };
  }
  const params = urlApi.isSecured
    ? {
        ...fetchParam,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    : { ...fetchParam };

  const fetchURL = pathParam ? urlApi.url + `/${pathParam}` : urlApi.url;

  const response = await fetch(fetchURL, params);
  if (!response.ok) {
    const msg = await response.text();
    console.log(msg);
    throw new Error(errorMsg);
  }

  const result = await response.json();
  if (result && returnType) {
    return result as T;
  }
  return {} as T;
};

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
    }
  }
);
