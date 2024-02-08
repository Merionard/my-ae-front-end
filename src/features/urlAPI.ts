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

export const fetchAllCustomers = () => {
  return client(CUSTOMERS, "GET", {} as Customer[]);
};

export const postCustomer = (customer: z.infer<typeof customerSchema>) => {
  return client(CUSTOMERS, "POST", {} as Customer, undefined, customer);
};

export const fetchOneCustomer = (customerId: string) => {
  return client(CUSTOMERS, "GET", {} as Customer, customerId);
};

export const updateCustomer = (
  customer: z.infer<typeof customerSchema>,
  customerId?: string
) => {
  return client(CUSTOMERS, "PUT", {} as Customer, customerId, customer);
};

export const deleteCustomer = (customerId: string) => {
  return client(CUSTOMERS, "DELETE", {} as Customer, customerId);
};
