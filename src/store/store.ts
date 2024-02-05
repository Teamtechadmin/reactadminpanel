import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthType } from "./types";

interface StoreState {
  auth: AuthType;
  setAuth: (user: AuthType) => void;
}

export const useAuthStore = create<StoreState>()(
  persist(
    (set) => ({
      auth: {
        loading: false,
        user: {
          role: "",
        },
      },
      setAuth: (auth: AuthType) => set(() => ({ auth })),
    }),
    {
      name: "auth-store",
    },
  ),
);
