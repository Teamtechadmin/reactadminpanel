import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  navVisible: boolean;
  setNavVisible: (navVisible: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      navVisible: false,
      setNavVisible: (navVisible: boolean) => set(() => ({ navVisible })),
    }),
    {
      name: "theme-store",
    },
  ),
);
