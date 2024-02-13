export type UrlApi = {
  url: string;
  isSecured: boolean;
};

const HOST_PREFIX_URL = "http://localhost:8080";

export const LOG_IN: UrlApi = {
  isSecured: false,
  url: HOST_PREFIX_URL + "/auth/login",
};
export const CUSTOMERS: UrlApi = {
  isSecured: true,
  url: HOST_PREFIX_URL + "/customers",
};

export const CRA: UrlApi = {
  isSecured: true,
  url: HOST_PREFIX_URL + "/cra",
};

export const CRA_LINE: UrlApi = {
  isSecured: true,
  url: HOST_PREFIX_URL + "/cra/workPeriodLine",
};

export const CRA_WORK_DAY: UrlApi = {
  isSecured: true,
  url: HOST_PREFIX_URL + "/cra/workDay",
};

export const INVOICE: UrlApi = {
  isSecured: true,
  url: HOST_PREFIX_URL + "/invoice",
};
