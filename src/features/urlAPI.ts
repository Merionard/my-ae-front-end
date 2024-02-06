import { Customer } from "@/lib/types";
import { client } from "./fetchClient";
import { customerSchema } from "@/components/forms/customer/customerSchemaAndTypes";
import * as z from "zod";

export type UrlApi = {
  url: string;
  isSecured: boolean;
};

export const LOG_IN: UrlApi = {
  isSecured: false,
  url: "http://localhost:8080/auth/login",
};
export const CUSTOMERS: UrlApi = {
  isSecured: true,
  url: "http://localhost:8080/customers",
};

export const fetchCustomers = () => {
  return client(CUSTOMERS, "GET", null, {} as Customer[]);
};

export const postCustomer = (customer: z.infer<typeof customerSchema>) => {
  return client(CUSTOMERS, "POST", customer, {} as Customer);
};
