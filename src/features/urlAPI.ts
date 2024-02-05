export type UrlApi = {
  url: string;
  isSecured: boolean;
};

export const LOG_IN: UrlApi = {
  isSecured: false,
  url: "http://localhost:8080/auth/login",
};
