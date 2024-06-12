import { Lead } from "@/services/leads/list/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  lead: Lead | null;
  setLead: (lead: Lead) => void;
}

export const useLeadStore = create<StoreState>()(
  persist(
    (set) => ({
      lead: null,
      setLead: (lead: Lead) => set(() => ({ lead })),
    }),
    {
      name: "lead-store",
    },
  ),
);
