import { Customer } from "@/const_utils/types";
import { client } from "./fetchClient";

export type UrlApi = {
  url: string;
  isSecured: boolean;
};

export const LOG_IN: UrlApi = {
  isSecured: false,
  url: "http://localhost:8080/auth/login",
};
export const GET_ALL_CUSTOMERS: UrlApi = {
  isSecured: true,
  url: "http://localhost:8080/customers",
};

export const fetchCustomers = () => {
  return client(GET_ALL_CUSTOMERS, "GET", null, {} as Customer[]);
};
