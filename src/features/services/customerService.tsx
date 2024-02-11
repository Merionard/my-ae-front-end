import { Customer } from "@/lib/types";
import { client } from "../fetchClient";
import { CUSTOMERS } from "../urlAPI";
import { z } from "zod";
import { customerSchema } from "@/components/forms/customer/customerSchemaAndTypes";

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
