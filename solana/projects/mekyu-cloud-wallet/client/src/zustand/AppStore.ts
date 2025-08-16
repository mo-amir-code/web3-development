import type { AppStoreActions, AppStoreState, TabType } from "@/types/zustand";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useAppStore = create<AppStoreState & AppStoreActions>()(
  immer((set) => ({
    tab: "wallet",
    setTab: (tab: TabType) =>
      set((state) => {
        state.tab = tab;
      }),
  }))
);

export { useAppStore };
