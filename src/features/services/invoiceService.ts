import { Invoice } from "@/lib/types";
import { client } from "../fetchClient";
import { INVOICE } from "../urlAPI";

export const fetchAllInvoices = () => {
  return client(INVOICE, "GET", {} as Invoice[]);
};
