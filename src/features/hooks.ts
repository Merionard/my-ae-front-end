import { User } from "@/const_utils/types";
import { useConnectedUserStore } from "./store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

const setAuthToken = (token: string) => {
  window.localStorage.setItem("auth_token", token);
};

export const useLogIn = () => {
  const { setUser } = useConnectedUserStore();
  const logIn = (user: User) => {
    setUser(user);
    setAuthToken(user.token);
  };
  return logIn;
};

export const useLogOut = () => {
  const { cleanUser } = useConnectedUserStore();
  const logOut = () => {
    cleanUser();
    window.localStorage.removeItem("auth_token");
  };
  return logOut;
};

export const useIsConnected = () => {
  const { isConnected } = useConnectedUserStore();
  return isConnected || getAuthToken() != null;
};

export const useGetAuthToken = () => {
  const { user } = useConnectedUserStore();
  if (user) {
    return user.token;
  }
  return getAuthToken();
};

export const useCheckConnection = () => {
  const isConnected = useIsConnected();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/login");
    }
  }, [isConnected, navigate]);
};
