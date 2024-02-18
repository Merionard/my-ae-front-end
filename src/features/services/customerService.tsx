import { customerSchema } from "@/components/forms/customer/customerSchemaAndTypes";
import { Customer } from "@/lib/types";
import { z } from "zod";
import { customFetchClient } from "../fetchClient";

const CUSTOMERS_API_URL = "/customers";

export const fetchAllCustomers = async () => {
  const { data: customers } = await customFetchClient.get<Customer[]>(
    CUSTOMERS_API_URL
  );
  return customers;
};

export const postCustomer = (customer: z.infer<typeof customerSchema>) => {
  return customFetchClient.post(CUSTOMERS_API_URL, customer);
};

export const fetchOneCustomer = async (customerId: string) => {
  const { data: customer } = await customFetchClient.get(
    CUSTOMERS_API_URL + `/${customerId}`
  );
  return customer;
};

export const updateCustomer = (
  customer: z.infer<typeof customerSchema>,
  customerId?: string
) => {
  return customFetchClient.put(CUSTOMERS_API_URL + `/${customerId}`, customer);
};

export const deleteCustomer = (customerId: string) => {
  return customFetchClient.delete(CUSTOMERS_API_URL + `/${customerId}`);
};
