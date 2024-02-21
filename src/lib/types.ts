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
  addresses: Address[];
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
  status: string;
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

export type ConditionsReglementType =
  | "30 jours fin de mois"
  | "45 jours"
  | "45 jours fin de mois"
  | "60 jours"
  | "60 jours fin de mois"
  | "90 jours";

export type TodoList = {
  title: string;
  userId?: number;
  tasks: Task[];
};

export type Task = {
  id?: number;
  title: string;
  description?: string;
  status?: string;
  order: number;
  createdAt?: Date;
  critical?: boolean;
};

export type DashBoardInfo = {
  workPeriodInfos: WorkPeriodInfo[];
  currentCA: number;
  lateInvoices: Invoice[];
  criticalTaskDto: Task[];
};

export type WorkPeriodInfo = {
  customerName: string;
  nbDaysWorked: number;
};
