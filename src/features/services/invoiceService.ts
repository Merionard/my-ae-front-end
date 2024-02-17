import { Invoice as ZodInvoice } from "@/components/forms/invoice/invoiceSchema";
import { Invoice } from "@/lib/types";
import { client, customFetchClient } from "../fetchClient";
import { INVOICE, INVOICE_PAY, INVOICE_VALIDATE } from "../urlAPI";

export const fetchAllInvoices = async () => {
  /*   const invoices = await client(INVOICE, "GET", {} as Invoice[]);
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
  return invoices; */
  const { data: invoices } = await customFetchClient.get<Invoice[]>("/invoice");
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
  return client(INVOICE, "POST", {} as Invoice, undefined, invoice);
};

export const editInvoice = (invoice: ZodInvoice) => {
  return client(INVOICE, "PUT", {} as Invoice, undefined, invoice);
};

export const fetchInvoice = (id: string) => {
  return client(INVOICE, "GET", {} as ZodInvoice, id);
};

export const validateInvoice = (id: number) => {
  return client(INVOICE_VALIDATE, "GET", {} as Invoice, id.toString());
};

export const payInvoice = (id: number, payDate: Date) => {
  return client(INVOICE_PAY, "PUT", {} as Invoice, id.toString(), payDate);
};

export const deleteInvoice = (id: number) => {
  return client(INVOICE, "DELETE", {} as Invoice, id.toString());
};
