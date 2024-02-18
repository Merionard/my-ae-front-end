import { Invoice as ZodInvoice } from "@/components/forms/invoice/invoiceSchema";
import { Invoice } from "@/lib/types";
import { customFetchClient } from "../fetchClient";

const API_INVOICE_URL = "/invoice";
export const fetchAllInvoices = async () => {
  const { data: invoices } = await customFetchClient.get<Invoice[]>(
    API_INVOICE_URL
  );
  invoices.forEach((invoice) => {
    if (invoice.dueDate != null) {
      invoice.dueDate = new Date(invoice.dueDate);
    }
    if (invoice.validateAt != null) {
      invoice.validateAt = new Date(invoice.validateAt);
    }
    if (invoice.payedAt != null) {
      invoice.payedAt = new Date(invoice.payedAt);
    }
  });
  return invoices;
};

export const createInvoice = (invoice: ZodInvoice) => {
  return customFetchClient.post<Invoice>(API_INVOICE_URL, invoice);
};

export const editInvoice = (invoice: ZodInvoice) => {
  return customFetchClient.put(API_INVOICE_URL, invoice);
};

export const fetchInvoice = async (id: string) => {
  const { data: invoice } = await customFetchClient.get<ZodInvoice>(
    API_INVOICE_URL + `/${id}`
  );
  return invoice;
};

export const validateInvoice = (id: number) => {
  return customFetchClient.get(API_INVOICE_URL + `/validate/${id}`);
};

export const payInvoice = (id: number, payDate: Date) => {
  return customFetchClient.put(API_INVOICE_URL + `/pay/${id}`, payDate);
};

export const deleteInvoice = (id: number) => {
  return customFetchClient.delete(API_INVOICE_URL + `/${id}`);
};
