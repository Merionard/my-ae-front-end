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
  nbDaysWorked: number;
  workDays: WorkDay[];
};

export type WorkDay = {
  id: number;
  date: Date;
  duration: number;
};
