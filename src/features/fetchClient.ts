import { getAuthToken } from "./hooks";
import { UrlApi } from "./urlAPI";

type FetchMethod = "GET" | "POST" | "DELETE";
/* function reviveDate(key: string, value: string) {
  // Matches strings like "2022-08-25T09:39:19.288Z"
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return typeof value === "string" && isoDateRegex.test(value)
    ? new Date(value)
    : value;
} */
export const client = async <T>(
  url: UrlApi,
  method: FetchMethod,
  body?: unknown,
  returnType?: T,
  errorMsg = "Une erreur est survenue"
) => {
  let fetchParam: RequestInit | undefined = undefined;
  if (method === "POST" || method === "DELETE") {
    fetchParam = {
      method: method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };
  }
  const params = url.isSecured
    ? {
        ...fetchParam,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    : { ...fetchParam };

  const response = await fetch(url.url, params);
  if (!response.ok) {
    const msg = await response.text();
    console.log(msg);
    throw new Error(errorMsg);
  }
  const result = await response.json();
  console.log(result);
  if (result && returnType) {
    return result as T;
  }
  throw new Error("error on deserialize json");
};
