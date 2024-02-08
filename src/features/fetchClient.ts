import { getAuthToken } from "./hooks";
import { UrlApi } from "./urlAPI";

type FetchMethod = "GET" | "POST" | "DELETE" | "PUT";
/* function reviveDate(key: string, value: string) {
  // Matches strings like "2022-08-25T09:39:19.288Z"
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return typeof value === "string" && isoDateRegex.test(value)
    ? new Date(value)
    : value;
} */
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
