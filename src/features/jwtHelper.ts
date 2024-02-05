export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthToken = (token: string) => {
  window.localStorage.setItem("auth_token", token);
};
