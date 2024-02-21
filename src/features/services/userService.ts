import { UserZod } from "@/components/forms/user/userSchema";
import { customFetchClient } from "../fetchClient";
import { User } from "@/lib/types";

export const updateUser = async (user: UserZod) => {
  const { data } = await customFetchClient.post<User>("/user", user);
  return data;
};

export const fetchUser = async () => {
  const { data } = await customFetchClient.get<User>("/user");
  return data;
};
