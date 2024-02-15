import { Invoice as ZodInvoice } from "@/components/forms/invoice/invoiceSchema";
import { client } from "../fetchClient";
import { INVOICE } from "../urlAPI";
import { Invoice } from "@/lib/types";

export const fetchAllInvoices = () => {
  return client(INVOICE, "GET", {} as Invoice[]);
};

export const createInvoice = (invoice: ZodInvoice) => {
  return client(INVOICE, "POST", {} as Invoice, undefined, invoice);
};

export const editInvoice = (invoice: ZodInvoice) => {
  return client(INVOICE, "PUT", {} as Invoice, undefined, invoice);
};

export const fetchInvoice = (id: string) => {
  return client(INVOICE, "GET", {} as ZodInvoice, id);
};
