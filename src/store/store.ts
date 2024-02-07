import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthType } from "./types";
import { defaultLogin } from "@/default/auth/login";

interface StoreState {
  auth: AuthType;
  setAuth: (user: AuthType) => void;
}

export const useAuthStore = create<StoreState>()(
  persist(
    (set) => ({
      auth: {
        loading: false,
        user: defaultLogin.user,
      },
      setAuth: (auth: AuthType) => set(() => ({ auth })),
    }),
    {
      name: "auth-store",
    },
  ),
);
