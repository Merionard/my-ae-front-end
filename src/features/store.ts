import { User } from "@/const_utils/types";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  isConnected: boolean;
  setUser: (user: User) => void;
  cleanUser: () => void;
};
export const useConnectedUserStore = create<UserStore>((set) => ({
  user: null,
  isConnected: false,
  setUser: (NewUser: User) => set(() => ({ user: NewUser, isConnected: true })),
  cleanUser: () => set({ user: null, isConnected: false }),
}));
