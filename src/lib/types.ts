import { number } from "zod";

export type User = {
  firstName: string;
  lastName: string;
  token: string;
  email: string;
};

export type Customer = {
  id: number;
  businessName: string;
  vatNumber: string | null;
  siren: string | null;
  address: Address[];
  contact?: Contact;
};

export type Address = {
  id: number;
  poCode: string;
  country: string;
  addressName: string;
  number: string;

  customerId: number;
  siret: string | null;
};

export type Contact = {
  id: number;
  name: string;
  firstName: string;
  email: string;
  customerId: number;
};

export type WorkPeriod = {
  id: number;
  month: number;
  year: number;
  lines: WorkPeriodLine[];
  userId: number;
};

export type WorkPeriodLine = {
  id: number;
  customerId: number;
  workDays: WorkDay[];
};

export type WorkDay = {
  id: number | null;
  date: Date;
  duration: number;
};

export type Invoice = {
  id: number;
  number: string;
  type: string;
  statut: string;
  customerName: string;
  customerSociety: string | null;
  customerSiren: string | null;
  customerVatNumber: string | null;
  customerAddress: string;
  customerCountry: string;
  customerMail: string | null;
  conditionReglement: string;
  modeReglement: string;
  createdAt: Date;
  validateAt: Date | null;
  payedAt: Date | null;
  dueDate: Date | null;
  lines: InvoiceLine[];
  totalHT: number;
  totalTTC: number;
};

export type InvoiceLine = {
  id: number;
  type: string;
  unitPrice: number;
  quantity: number;
  vatRate: number;
  totalHT: number;
  totalTTC: number;
  VatAmount: number;
};
